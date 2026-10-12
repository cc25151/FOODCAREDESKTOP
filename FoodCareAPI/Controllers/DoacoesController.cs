using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FoodCareAPI.Data;
using FoodCareAPI.Models;

namespace FoodCareAPI.Controllers;

[ApiController]
[Route("doacoes")]
public class DoacoesController : ControllerBase
{
    private readonly AppDbContext _bancoDeDados;

    public DoacoesController(AppDbContext bancoDeDados)
    {
        _bancoDeDados = bancoDeDados;
    }

    [HttpGet]
    public async Task<IActionResult> ObterTodas()
    {
        var doacoes = await _bancoDeDados.Doacao
            .Include(d => d.doador).ThenInclude(doad => doad.usuario)
            .Include(d => d.receptor)
            .Include(d => d.alimento)
            .ToListAsync();

        var usuarios = await _bancoDeDados.Usuario.ToListAsync();

        var resultado = doacoes.Select(d => new
        {
            d.idDoacao,
            d.dataDoacao,
            d.horario,
            d.avaliacao,
            d.status,
            doadorNome = d.doador?.usuario?.nome ?? "Não informado",
            receptorNome = usuarios.FirstOrDefault(u => u.idUsuario == d.receptor.idUsuario)?.nome ?? "Não informado",
            alimentoNome = d.alimento?.nome ?? "Não informado"
        }).ToList();

        return Ok(resultado);
    }

    [HttpGet("realizadas")]
    public async Task<IActionResult> ObterRealizadas()
    {
        var doacoes = await _bancoDeDados.Doacao
            .Where(d => d.status.ToLower() == "finalizada")
            .Include(d => d.alimento)
            .ToListAsync();

        var resultado = doacoes.Select(d => new
        {
            d.idDoacao,
            d.dataDoacao,
            d.horario,
            d.avaliacao,
            d.status,
            alimentoNome = d.alimento?.nome ?? "Não informado"
        }).ToList();

        return Ok(resultado);
    }

    [HttpGet("pendentes")]
    public async Task<IActionResult> ObterPendentes()
    {
        var doacoes = await _bancoDeDados.Doacao
            .Where(d => d.status.ToLower() == "pendente")
            .Include(d => d.alimento)
            .ToListAsync();

        var resultado = doacoes.Select(d => new
        {
            d.idDoacao,
            d.dataDoacao,
            d.horario,
            d.avaliacao,
            d.status,
            alimentoNome = d.alimento?.nome ?? "Não informado"
        }).ToList();

        return Ok(resultado);
    }

    [HttpGet("doador/{idDoador:int}")]
    public async Task<IActionResult> ObterPorDoador(int idDoador)
    {
        var doacoes = await _bancoDeDados.Doacao
            .Where(d => d.idDoador == idDoador)
            .Include(d => d.alimento)
            .ToListAsync();

        if (!doacoes.Any()) 
            return NotFound("Nenhuma doação encontrada para este doador.");

        var resultado = doacoes.Select(d => new
        {
            d.idDoacao,
            d.dataDoacao,
            d.horario,
            d.avaliacao,
            d.status,
            alimentoNome = d.alimento?.nome ?? "Não informado"
        }).ToList();

        return Ok(resultado);
    }

    [HttpPost]
    public async Task<IActionResult> Cadastrar([FromBody] Doacao novaDoacao)
    {
        var doadorExiste = await _bancoDeDados.Doador.AnyAsync(d => d.idDoador == novaDoacao.idDoador);
        if (!doadorExiste) 
            return NotFound("Doador não encontrado na base de dados.");

        var receptorExiste = await _bancoDeDados.Receptor.AnyAsync(r => r.idReceptor == novaDoacao.idReceptor);
        if (!receptorExiste)
            return NotFound("Receptor não encontrado na base de dados.");

        var alimento = await _bancoDeDados.Alimento.FirstOrDefaultAsync(a => 
            a.idAlimento == novaDoacao.idAlimento && a.idDoador == novaDoacao.idDoador);

        if (alimento == null) 
            return BadRequest("Alimento inválido ou não pertence a este doador.");

        novaDoacao.avaliacao = 0;
        novaDoacao.status = "Pendente";
        
        if (novaDoacao.dataDoacao == default) novaDoacao.dataDoacao = DateOnly.FromDateTime(DateTime.Now);
        if (novaDoacao.horario == default) novaDoacao.horario = TimeOnly.FromDateTime(DateTime.Now);

        _bancoDeDados.Doacao.Add(novaDoacao);
        await _bancoDeDados.SaveChangesAsync();

        return Created($"/doacoes/{novaDoacao.idDoacao}", new
        {
            id = novaDoacao.idDoacao,
            alimento = alimento.nome,
            status = novaDoacao.status,
            mensagem = "Doação registrada com sucesso!"
        });
    }

    [HttpPatch("{id:int}/finalizar")]
    public async Task<IActionResult> Finalizar(int id, [FromQuery] int nota)
    {
        var doacao = await _bancoDeDados.Doacao.FindAsync(id);

        if (doacao is null) 
            return NotFound("Doação não encontrada.");
        
        if (nota < 1 || nota > 5) 
            return BadRequest("A nota de avaliação deve estar entre 1 e 5 estrelas.");

        doacao.avaliacao = nota;
        doacao.status = "Finalizada";
        
        await _bancoDeDados.SaveChangesAsync();

        return Ok(new { mensagem = "Doação finalizada e avaliada com sucesso!" });
    }
}