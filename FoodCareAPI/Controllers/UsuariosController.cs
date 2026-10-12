using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FoodCareAPI.Data;
using FoodCareAPI.Models;

namespace FoodCareAPI.Controllers;

[ApiController]
[Route("usuarios")]
public class UsuariosController : ControllerBase
{
    private readonly AppDbContext _bancoDeDados;

    public UsuariosController(AppDbContext bancoDeDados)
    {
        _bancoDeDados = bancoDeDados;
    }

    [HttpGet]
    public async Task<IActionResult> ObterTodos()
    {
        var usuarios = await _bancoDeDados.Usuario.ToListAsync();
        return Ok(usuarios);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> ObterPorId(int id)
    {
        var usuario = await _bancoDeDados.Usuario.FindAsync(id);
        if (usuario is null)
            return NotFound("Usuário não encontrado.");

        usuario.senha = string.Empty;
        return Ok(usuario);
    }

    [HttpPost("cadastro")]
    public async Task<IActionResult> Cadastrar([FromBody] Usuario usuario)
    {
        if (await _bancoDeDados.Usuario.AnyAsync(u => u.email == usuario.email))
            return BadRequest("Este e-mail já está em uso.");

        if (await _bancoDeDados.Usuario.AnyAsync(u => u.documento == usuario.documento))
            return BadRequest("Este CPF/CNPJ já está cadastrado.");
        
        usuario.senha = BCrypt.Net.BCrypt.HashPassword(usuario.senha);
        usuario.tipoPessoa = usuario.tipoPessoa.ToUpper();
    
        _bancoDeDados.Usuario.Add(usuario);
        await _bancoDeDados.SaveChangesAsync();

        return Created($"/usuarios/{usuario.idUsuario}", new 
        { 
            usuario.idUsuario, 
            mensagem = "Cadastro realizado! Complete seu perfil para doar ou receber." 
        });
    }

    [HttpPatch("completar-perfil/{id:int}")]
    public async Task<IActionResult> CompletarPerfil(int id, [FromBody] Usuario dadosPerfil)
    {
        var usuario = await _bancoDeDados.Usuario.FindAsync(id);
        if (usuario is null) return NotFound("Usuário não encontrado.");

        usuario.cep = !string.IsNullOrWhiteSpace(dadosPerfil.cep) ? dadosPerfil.cep : usuario.cep;
        usuario.cidade = !string.IsNullOrWhiteSpace(dadosPerfil.cidade) ? dadosPerfil.cidade : usuario.cidade;
        usuario.bairro = !string.IsNullOrWhiteSpace(dadosPerfil.bairro) ? dadosPerfil.bairro : usuario.bairro;
        usuario.rua = !string.IsNullOrWhiteSpace(dadosPerfil.rua) ? dadosPerfil.rua : usuario.rua;
        usuario.numero = !string.IsNullOrWhiteSpace(dadosPerfil.numero) ? dadosPerfil.numero : usuario.numero;
    
        usuario.latitude = dadosPerfil.latitude ?? usuario.latitude;
        usuario.longitude = dadosPerfil.longitude ?? usuario.longitude;

        await _bancoDeDados.SaveChangesAsync();

        return Ok(new { mensagem = "Perfil e localização atualizados com sucesso!" });
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Remover(int id)
    {
        var usuario = await _bancoDeDados.Usuario.FindAsync(id);
        if (usuario is null) return NotFound();

        _bancoDeDados.Usuario.Remove(usuario);
        await _bancoDeDados.SaveChangesAsync();

        return Ok($"Usuário {id} removido.");
    }
}