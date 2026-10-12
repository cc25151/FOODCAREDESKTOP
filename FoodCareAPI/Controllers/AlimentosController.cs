using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FoodCareAPI.Data;
using FoodCareAPI.Models;

namespace FoodCareAPI.Controllers;

[ApiController]
[Route("alimentos")]
public class AlimentosController : ControllerBase
{
    private readonly AppDbContext _bancoDeDados;

    public AlimentosController(AppDbContext bancoDeDados)
    {
        _bancoDeDados = bancoDeDados;
    }

    [HttpGet("feed/{idUsuario}")]
    public async Task<IActionResult> ObterFeedPorUsuario(int idUsuario)
    {
        var usuario = await _bancoDeDados.Usuario.FindAsync(idUsuario);

        if (usuario is null)
            return NotFound("Usuário não encontrado.");

        if (usuario.latitude is null || usuario.longitude is null)
            return BadRequest("Usuário sem localização cadastrada.");

        var alimentos = await _bancoDeDados.Alimento
            .Include(a => a.doador)
            .ThenInclude(d => d.usuario)
            .ToListAsync();

        foreach (var alimento in alimentos)
        {
            var usuarioDoador = alimento.doador?.usuario;

            if (usuarioDoador?.latitude != null && usuarioDoador?.longitude != null)
            {
                alimento.distancia = CalcularDistanciaEmQuilometros(
                    (double)usuario.latitude!,
                    (double)usuario.longitude!,
                    (double)usuarioDoador.latitude!,
                    (double)usuarioDoador.longitude!
                );
            }
        }

        return Ok(alimentos);
    }

    [HttpGet("{categoria}")]
    public async Task<IActionResult> ObterPorCategoria(string categoria)
    {
        var resultados = await _bancoDeDados.Alimento
            .Where(a => a.categoria.nome.ToLower() == categoria.ToLower())
            .ToListAsync();

        return resultados.Any() ? Ok(resultados) : NotFound();
    }

    [HttpGet("id/{idAlimento}")]
    [Authorize]
    public async Task<IActionResult> ObterPorId(int idAlimento)
    {
        var idUsuarioToken = User.FindFirst("idUsuario")?.Value;

        if (string.IsNullOrEmpty(idUsuarioToken) || !int.TryParse(idUsuarioToken, out int idUsuarioLogado))
            return Unauthorized();

        var usuarioLogado = await _bancoDeDados.Usuario.FindAsync(idUsuarioLogado);
        if (usuarioLogado is null || usuarioLogado.latitude is null || usuarioLogado.longitude is null)
            return BadRequest("Usuário logado sem localização cadastrada.");

        var alimento = await _bancoDeDados.Alimento
            .Include(a => a.doador)
            .ThenInclude(d => d.usuario)
            .FirstOrDefaultAsync(a => a.idAlimento == idAlimento);

        if (alimento == null)
            return NotFound("Alimento não encontrado.");

        var usuarioDoador = alimento.doador?.usuario;

        if (usuarioDoador?.latitude != null && usuarioDoador?.longitude != null)
        {
            alimento.distancia = CalcularDistanciaEmQuilometros(
                (double)usuarioLogado.latitude!,
                (double)usuarioLogado.longitude!,
                (double)usuarioDoador.latitude!,
                (double)usuarioDoador.longitude!
            );
        }

        return Ok(new
        {
            alimento.idAlimento,
            alimento.nome,
            alimento.idCategoria,
            alimento.idDoador,
            alimento.descricao,
            alimento.distancia,
            alimento.validade,
            usuarioDoador?.latitude,
            usuarioDoador?.longitude
        });
    }

    [HttpGet("doador/{idUsuario}")]
    public async Task<IActionResult> ObterPorDoador(int idUsuario)
    {
        var alimentos = await _bancoDeDados.Alimento
            .Include(a => a.doador)
            .Include(a => a.categoria)
            .Where(a => a.doador.idUsuario == idUsuario)
            .ToListAsync();

        return Ok(alimentos.Select(a => new
        {
            a.idAlimento,
            a.nome,
            a.idCategoria,
            categoria = a.categoria.nome,
            a.qntd,
            a.descricao,
            a.validade
        }).ToList());
    }

    [HttpPatch("alterar/{idAlimento}")]
    public async Task<IActionResult> AtualizarParcialmente(int idAlimento, [FromBody] Alimento dadosAlterados)
    {
        var alimento = await _bancoDeDados.Alimento.FindAsync(idAlimento);

        if (alimento is null)
        {
            return NotFound(new { erro = "Alimento não encontrado no banco." });
        }

        alimento.qntd = dadosAlterados.qntd;
        alimento.descricao = dadosAlterados.descricao;

        if (dadosAlterados.validade != null)
        {
            alimento.validade = dadosAlterados.validade;
        }

        await _bancoDeDados.SaveChangesAsync();

        return Ok();
    }

    [HttpPost("doador/{idUsuario}")]
    public async Task<IActionResult> Cadastrar(int idUsuario, [FromBody] Alimento novoAlimento)
    {
        var doador = await _bancoDeDados.Doador.FirstOrDefaultAsync(d => d.idUsuario == idUsuario);
        if (doador == null)
            return NotFound("Doador não encontrado.");

        novoAlimento.idDoador = doador.idDoador;
        _bancoDeDados.Alimento.Add(novoAlimento);
        await _bancoDeDados.SaveChangesAsync();

        return Created(string.Empty, null);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Atualizar(int id, [FromBody] Alimento alimentoAlterado)
    {
        var alimento = await _bancoDeDados.Alimento.FindAsync(id);

        if (alimento is null)
            return NotFound("Alimento não encontrado.");

        alimento.nome = alimentoAlterado.nome;
        alimento.descricao = alimentoAlterado.descricao;
        alimento.qntd = alimentoAlterado.qntd;
        alimento.validade = alimentoAlterado.validade;
        alimento.idCategoria = alimentoAlterado.idCategoria;

        await _bancoDeDados.SaveChangesAsync();

        return Ok(new { mensagem = "Alimento alterado com sucesso!" });
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Remover(int id)
    {
        var alimento = await _bancoDeDados.Alimento.FindAsync(id);

        if (alimento is not null)
        {
            _bancoDeDados.Alimento.Remove(alimento);
            await _bancoDeDados.SaveChangesAsync();
            return Ok(new { mensagem = "Alimento removido com sucesso!" });
        }

        return NotFound("Alimento não encontrado.");
    }

    private static double CalcularDistanciaEmQuilometros(double latitude1, double longitude1, double latitude2, double longitude2)
    {
        var raioTerraKm = 6371.0;

        var diferencaLatitude = (latitude2 - latitude1) * Math.PI / 180.0;
        var diferencaLongitude = (longitude2 - longitude1) * Math.PI / 180.0;

        var calculoA = Math.Sin(diferencaLatitude / 2) * Math.Sin(diferencaLatitude / 2) +
                       Math.Cos(latitude1 * Math.PI / 180.0) *
                       Math.Cos(latitude2 * Math.PI / 180.0) *
                       Math.Sin(diferencaLongitude / 2) * Math.Sin(diferencaLongitude / 2);

        var calculoC = 2 * Math.Atan2(Math.Sqrt(calculoA), Math.Sqrt(1 - calculoA));

        return raioTerraKm * calculoC;
    }
}