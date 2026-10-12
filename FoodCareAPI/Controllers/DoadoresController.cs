using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FoodCareAPI.Data;
using FoodCareAPI.Models;

namespace FoodCareAPI.Controllers;

[ApiController]
[Route("doadores")]
public class DoadoresController : ControllerBase
{
    private readonly AppDbContext _bancoDeDados;

    public DoadoresController(AppDbContext bancoDeDados)
    {
        _bancoDeDados = bancoDeDados;
    }

    [HttpGet("{idDoador:int}")]
    public async Task<IActionResult> ObterPorId(int idDoador)
    {
        var doador = await _bancoDeDados.Doador
            .Include(d => d.usuario)
            .FirstOrDefaultAsync(d => d.idDoador == idDoador);

        if (doador is null)
            return NotFound("Doador não encontrado.");
        
        var endereco = $"{doador.usuario.rua}, {doador.usuario.numero} - {doador.usuario.bairro}, {doador.usuario.cidade}";

        return Ok(new 
        {
            doador.idDoador,
            doador.usuario.nome,
            doador.idUsuario,
            doador.pontuacao,
            endereco
        });
    }

    [HttpPost("cadastro")]
    public async Task<IActionResult> Cadastrar([FromBody] Doador doador)
    {
        var usuarioExiste = await _bancoDeDados.Usuario.AnyAsync(u => u.idUsuario == doador.idUsuario);
        if (!usuarioExiste)
        {
            return BadRequest("O usuário informado não existe.");
        }

        var jaEhDoador = await _bancoDeDados.Doador.AnyAsync(d => d.idUsuario == doador.idUsuario);
        if (jaEhDoador)
        {
            return BadRequest("Este usuário já está cadastrado como doador.");
        }

        var novoDoador = new Doador
        {
            idUsuario = doador.idUsuario,
            pontuacao = 0
        };

        _bancoDeDados.Doador.Add(novoDoador);
        await _bancoDeDados.SaveChangesAsync();

        return Created($"/doadores/{novoDoador.idDoador}", new
        {   
            mensagem = "Doador cadastrado com sucesso!",
            idDoador = novoDoador.idDoador,
            idUsuario = novoDoador.idUsuario,
        });
    }
}