using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer; // Faltava este namespace para o JwtBearer
using FoodCareAPI.Data;

var construtor = WebApplication.CreateBuilder(args);

// 1. CONFIGURAÇÃO DOS SERVIÇOS

// Adiciona suporte aos Controllers do padrão MVC
construtor.Services.AddControllers();

// Configura o Swagger
construtor.Services.AddEndpointsApiExplorer();
construtor.Services.AddSwaggerGen();

construtor.Services.AddAuthorization();

// Busca a chave secreta no arquivo appsettings.json
var chaveSecreta = construtor.Configuration["JwtSettings:ChaveSecreta"]; 

if (string.IsNullOrEmpty(chaveSecreta))
{
    throw new InvalidOperationException("A chave secreta do JWT não foi configurada no appsettings.json!");
}

// Configura a Autenticação JWT
construtor.Services.AddAuthentication(opcoes =>
{
    opcoes.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opcoes.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(opcoes =>
{
    opcoes.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(chaveSecreta)),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

// Configura a conexão com o banco de dados SQL Server
construtor.Services.AddDbContext<AppDbContext>(opcoes =>
    opcoes.UseSqlServer(construtor.Configuration.GetConnectionString("DefaultConnection")));

var aplicacao = construtor.Build();

// 2. CONFIGURAÇÃO DO PIPELINE DE REQUISIÇÕES (MIDDLEWARES)

if (aplicacao.Environment.IsDevelopment())
{
    aplicacao.UseSwagger();
    aplicacao.UseSwaggerUI();
}

aplicacao.UseRouting(); 

// Ativa a Autenticação e Autorização
aplicacao.UseAuthentication(); 
aplicacao.UseAuthorization();

// Mapeia automaticamente as rotas dos Controllers
aplicacao.MapControllers();

aplicacao.Run();