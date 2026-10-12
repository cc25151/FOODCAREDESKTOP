using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FoodCareAPI.Data;
using FoodCareAPI.Models;

namespace FoodCareAPI.Controllers;

[ApiController]
[Route("receptores")]
public class ReceptoresController : ControllerBase
{
    private readonly AppDbContext _bancoDeDados;

    public ReceptoresController(AppDbContext bancoDeDados)
    {
        _bancoDeDados = bancoDeDados;
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> ObterPorId(int id)
    {
        var receptor = await _bancoDeDados.Receptor.FindAsync(id);
        if (receptor is null)
            return NotFound("Receptor não encontrado.");

        return Ok(receptor);
    }

    [HttpPost("cadastro")]
    public async Task<IActionResult> Cadastrar([FromBody] Receptor novoReceptor)
    {
        var usuarioExiste = await _bancoDeDados.Usuario.AnyAsync(u => u.idUsuario == novoReceptor.idUsuario);
        if (!usuarioExiste)
        {
            return BadRequest("O usuário informado não existe.");
        }

        var jaEhReceptor = await _bancoDeDados.Receptor.AnyAsync(r => r.idUsuario == novoReceptor.idUsuario);
        if (jaEhReceptor)
        {
            return BadRequest("Este usuário já está cadastrado como receptor.");
        }

        _bancoDeDados.Receptor.Add(novoReceptor);
        await _bancoDeDados.SaveChangesAsync();

        return Created($"/receptores/{novoReceptor.idReceptor}", new
        {
            idReceptor = novoReceptor.idReceptor,
            idUsuario = novoReceptor.idUsuario,
        });
    }
}