using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FoodCareAPI.Data;

namespace FoodCareAPI.Controllers;

[ApiController]
[Route("categorias")]
public class CategoriasController : ControllerBase
{
    private readonly AppDbContext _bancoDeDados;

    public CategoriasController(AppDbContext bancoDeDados)
    {
        _bancoDeDados = bancoDeDados;
    }

    [HttpGet]
    public async Task<IActionResult> ObterTodas()
    {
        var categorias = await _bancoDeDados.Categoria.ToListAsync();
        return Ok(categorias);
    }

    [HttpGet("{nome}")]
    public async Task<IActionResult> ObterPorNome(string nome)
    {
        var resultados = await _bancoDeDados.Categoria
            .Where(c => c.nome.ToLower() == nome.ToLower())
            .ToListAsync();

        return resultados.Any() ? Ok(resultados) : NotFound();
    }
}