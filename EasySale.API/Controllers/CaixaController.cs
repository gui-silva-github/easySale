using Microsoft.AspNetCore.Mvc;
using EasySale.API.UseCases.Caixa.Abrir;
using EasySale.API.UseCases.Caixa.Fechar;
using EasySale.API.UseCases.Caixa.GetAll;
using EasySale.API.UseCases.Caixa.GetById;
using EasySale.API.UseCases.Caixa.ListarAbertos;
using EasySale.API.UseCases.Caixa.ListarDisponiveis;
using EasySale.API.UseCases.Caixa.Register;
using EasySale.API.UseCases.Caixa.Sair;
using EasySale.API.UseCases.Caixa.Selecionar;
using Communication.Requests.Caixa;
using Communication.Responses.Caixa;
using Communication.Responses.Error;

namespace EasySale.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CaixaController : ControllerBase
    {
        private readonly RegisterCaixaUseCase _registerCaixaUseCase;
        private readonly AbrirCaixaUseCase _abrirCaixaUseCase;
        private readonly FecharCaixaUseCase _fecharCaixaUseCase;
        private readonly GetAllCaixasUseCase _getAllCaixasUseCase;
        private readonly GetCaixaByIdUseCase _getCaixaByIdUseCase;
        private readonly ListarCaixasDisponiveisUseCase _listarCaixasDisponiveisUseCase;
        private readonly ListarCaixasAbertosUseCase _listarCaixasAbertosUseCase;
        private readonly SelecionarCaixaUseCase _selecionarCaixaUseCase;
        private readonly SairCaixaUseCase _sairCaixaUseCase;

        public CaixaController(
            RegisterCaixaUseCase registerCaixaUseCase,
            AbrirCaixaUseCase abrirCaixaUseCase,
            FecharCaixaUseCase fecharCaixaUseCase,
            GetAllCaixasUseCase getAllCaixasUseCase,
            GetCaixaByIdUseCase getCaixaByIdUseCase,
            ListarCaixasDisponiveisUseCase listarCaixasDisponiveisUseCase,
            ListarCaixasAbertosUseCase listarCaixasAbertosUseCase,
            SelecionarCaixaUseCase selecionarCaixaUseCase,
            SairCaixaUseCase sairCaixaUseCase)
        {
            _registerCaixaUseCase = registerCaixaUseCase;
            _abrirCaixaUseCase = abrirCaixaUseCase;
            _fecharCaixaUseCase = fecharCaixaUseCase;
            _getAllCaixasUseCase = getAllCaixasUseCase;
            _getCaixaByIdUseCase = getCaixaByIdUseCase;
            _listarCaixasDisponiveisUseCase = listarCaixasDisponiveisUseCase;
            _listarCaixasAbertosUseCase = listarCaixasAbertosUseCase;
            _selecionarCaixaUseCase = selecionarCaixaUseCase;
            _sairCaixaUseCase = sairCaixaUseCase;
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseCaixaJSON), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status400BadRequest)]
        public IActionResult Register([FromBody] RequestCaixaJSON request)
        {
            var response = _registerCaixaUseCase.Execute(request);
            return Created(string.Empty, response);
        }

        [HttpPost]
        [Route("Abrir")]
        [ProducesResponseType(typeof(ResponseAberturaCaixaJSON), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status404NotFound)]
        public IActionResult Abrir([FromBody] RequestAbrirCaixaJSON request, [FromQuery] Guid caixaId)
        {
            var response = _abrirCaixaUseCase.Execute(caixaId, request);
            return Created(string.Empty, response);
        }

        [HttpPost]
        [Route("{id}/Fechar")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status404NotFound)]
        public IActionResult Fechar([FromRoute] Guid id)
        {
            _fecharCaixaUseCase.Execute(id);
            return NoContent();
        }

        [HttpGet]
        [Route("Listar")]
        [ProducesResponseType(typeof(ResponseAllCaixasJSON), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public IActionResult Listar()
        {
            var response = _getAllCaixasUseCase.Execute();

            if (response.Caixas.Count == 0)
                return NoContent();

            return Ok(response);
        }

        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(typeof(ResponseCaixaJSON), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status404NotFound)]
        public IActionResult GetById([FromRoute] Guid id)
        {
            var response = _getCaixaByIdUseCase.Execute(id);
            return Ok(response);
        }

        [HttpGet]
        [Route("ListarDisponiveis")]
        [ProducesResponseType(typeof(ResponseAllCaixasJSON), StatusCodes.Status200OK)]
        public IActionResult ListarDisponiveis()
        {
            var response = _listarCaixasDisponiveisUseCase.Execute();
            return Ok(response);
        }

        [HttpGet]
        [Route("ListarAbertos")]
        [ProducesResponseType(typeof(ResponseAllCaixasJSON), StatusCodes.Status200OK)]
        public IActionResult ListarAbertos()
        {
            var response = _listarCaixasAbertosUseCase.Execute();
            return Ok(response);
        }

        [HttpPost]
        [Route("{id}/Selecionar")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status400BadRequest)]
        public IActionResult Selecionar([FromRoute] Guid id)
        {
            _selecionarCaixaUseCase.Execute(id);
            return NoContent();
        }

        [HttpPost]
        [Route("{id}/Sair")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status404NotFound)]
        public IActionResult Sair([FromRoute] Guid id)
        {
            _sairCaixaUseCase.Execute(id);
            return NoContent();
        }
    }
}
