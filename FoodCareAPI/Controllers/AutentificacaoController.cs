using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using FoodCareAPI.Data;
using FoodCareAPI.DTOs;

namespace FoodCareAPI.Controllers;

[ApiController]
[Route("login")]
public class AutenticacaoController : ControllerBase
{
    private readonly AppDbContext _bancoDeDados;
    private readonly IConfiguration _configuracao;

    public AutenticacaoController(AppDbContext bancoDeDados, IConfiguration configuracao)
    {
        _bancoDeDados = bancoDeDados;
        _configuracao = configuracao;
    }

    [HttpPost]
    public async Task<IActionResult> Autenticar([FromBody] RequisicaoLoginDTO usuarioLogin)
    {
        var usuario = await _bancoDeDados.Usuario
            .FirstOrDefaultAsync(u => u.email == usuarioLogin.email);

        if (usuario is null || !BCrypt.Net.BCrypt.Verify(usuarioLogin.senha, usuario.senha))
            return Unauthorized();

        var tokenHandler = new JwtSecurityTokenHandler();
        var chaveSecreta = _configuracao["JwtSettings:ChaveSecreta"]!;
        var chaveBytes = Encoding.ASCII.GetBytes(chaveSecreta);

        var descricaoToken = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, usuario.nome),
                new Claim(ClaimTypes.Email, usuario.email),
                new Claim("idUsuario", usuario.idUsuario.ToString()),
                new Claim("tipo", usuario.tipoPessoa)
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials( 
                new SymmetricSecurityKey(chaveBytes), 
                SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(descricaoToken);
        var tokenString = tokenHandler.WriteToken(token);

        var ehDoador = _bancoDeDados.Doador.Any(d => d.idUsuario == usuario.idUsuario);
        var ehReceptor = _bancoDeDados.Receptor.Any(r => r.idUsuario == usuario.idUsuario);
        
        string tipo = (ehDoador, ehReceptor) switch
        {
            (true, true) => "ambos",
            (true, false) => "doador",
            _ => "receptor"
        };

        return Ok(new 
        { 
            usuario.idUsuario,
            usuario.nome,
            token = tokenString,
            tipoUsuario = tipo
        });
    }
}