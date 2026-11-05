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
        .Include(d => d.doador).ThenInclude(doad => doad!.usuario)
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
        receptorNome = usuarios.FirstOrDefault(u => u.idUsuario == d.receptor?.idUsuario)?.nome ?? "Não informado",
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
        // 1. Busca doações aceitando tanto o idDoador quanto o idUsuario do Doador
        var doacoes = await _bancoDeDados.Doacao
            .Include(d => d.doador)
            .Include(d => d.alimento)
            .Where(d => d.idDoador == idDoador || (d.doador != null && d.doador.idUsuario == idDoador))
            .ToListAsync();

        // 2. Transforma o resultado (se for vazio, gera [] sem estourar 404)
        var resultado = doacoes.Select(d => new
        {
            d.idDoacao,
            d.dataDoacao,
            d.horario,
            d.avaliacao,
            d.status,
            alimentoNome = d.alimento?.nome ?? "Não informado",
            descricao = d.alimento?.descricao ?? "",
            qntd = d.alimento?.qntd ?? 0,
            idCategoria = d.alimento?.idCategoria
        }).ToList();

        return Ok(resultado);
    }

    [HttpPost]
public async Task<IActionResult> Cadastrar([FromBody] Doacao novaDoacao)
{
    try
    {
        // 1. Localiza o alimento para obter o idDoador real
        var alimento = await _bancoDeDados.Alimento
            .FirstOrDefaultAsync(a => a.idAlimento == novaDoacao.idAlimento);

        if (alimento == null) 
            return NotFound("Alimento não encontrado na base de dados.");

        // 2. Localiza o receptor pelo idReceptor ou idUsuario
        var receptor = await _bancoDeDados.Receptor
            .FirstOrDefaultAsync(r => r.idReceptor == novaDoacao.idReceptor || r.idUsuario == novaDoacao.idReceptor);

        if (receptor == null)
            return NotFound("Receptor não encontrado na base de dados.");


        var doacaoParaSalvar = new Doacao
        {
            idDoador = alimento.idDoador,
            idReceptor = receptor.idReceptor,
            idAlimento = alimento.idAlimento,
            dataDoacao = novaDoacao.dataDoacao != default ? novaDoacao.dataDoacao : DateOnly.FromDateTime(DateTime.Now),
            horario = novaDoacao.horario != default ? novaDoacao.horario : TimeOnly.FromDateTime(DateTime.Now),
            avaliacao = null,
            status = "Pendente"
        };

        _bancoDeDados.Doacao.Add(doacaoParaSalvar);
        await _bancoDeDados.SaveChangesAsync(); 

        return Created($"/doacoes/{doacaoParaSalvar.idDoacao}", new
        {
            id = doacaoParaSalvar.idDoacao,
            alimento = alimento.nome,
            status = doacaoParaSalvar.status,
            mensagem = "Doação registrada com sucesso!"
        });
    }
    catch (Exception ex)
    {
        var detalheErro = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
        return StatusCode(500, new { erro = "Falha ao gravar no banco de dados.", detalhe = detalheErro });
    }
}

    [HttpPatch("{id:int}/finalizar")]
    public async Task<IActionResult> Finalizar(int id, [FromQuery] int? idDoador, [FromQuery] int? nota)
    {
        // Inclui a propriedade de navegação doador para acessar o idUsuario
        var doacao = await _bancoDeDados.Doacao
            .Include(d => d.doador)
            .FirstOrDefaultAsync(d => d.idDoacao == id);

        if (doacao is null) 
            return NotFound("Doação não encontrada.");

        // Valida se o ID repassado pertence ao doador (seja por idDoador ou por idUsuario)
        if (idDoador.HasValue)
        {
            bool ehDoadorValido = doacao.idDoador == idDoador.Value || 
                                (doacao.doador != null && doacao.doador.idUsuario == idDoador.Value);

            if (!ehDoadorValido)
            {
                return BadRequest("Esta doação não pertence a este doador.");
            }
        }

        // Se uma nota for fornecida, valida se está no intervalo de 1 a 5
        if (nota.HasValue)
        {
            if (nota.Value < 1 || nota.Value > 5) 
                return BadRequest("A nota de avaliação deve estar entre 1 e 5 estrelas.");

            doacao.avaliacao = nota.Value;
        }

        doacao.status = "Finalizada";
        
        await _bancoDeDados.SaveChangesAsync();

        return Ok(new { mensagem = "Doação finalizada com sucesso!" });
    }
}