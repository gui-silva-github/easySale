using Microsoft.AspNetCore.Mvc;
using EasySale.API.UseCases.Caixa.Abrir;
using EasySale.API.UseCases.Caixa.Fechar;
using EasySale.API.UseCases.Caixa.GetAll;
using EasySale.API.UseCases.Caixa.GetById;
using EasySale.API.UseCases.Caixa.ListarAbertos;
using EasySale.API.UseCases.Caixa.ListarDisponiveis;
using EasySale.API.UseCases.Caixa.ObterAberturaAtual;
using EasySale.API.UseCases.Caixa.ConferenciaCegaGet;
using EasySale.API.UseCases.Caixa.ConferenciaCegaPost;
using EasySale.API.UseCases.Caixa.Register;
using EasySale.API.UseCases.Caixa.RegistrarMovimento;
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
        private readonly ObterAberturaAtualUseCase _obterAberturaAtualUseCase;
        private readonly ConferenciaCegaGetUseCase _conferenciaCegaGetUseCase;
        private readonly ConferenciaCegaPostUseCase _conferenciaCegaPostUseCase;
        private readonly RegistrarMovimentoCaixaUseCase _registrarMovimentoCaixaUseCase;

        public CaixaController(
            RegisterCaixaUseCase registerCaixaUseCase,
            AbrirCaixaUseCase abrirCaixaUseCase,
            FecharCaixaUseCase fecharCaixaUseCase,
            GetAllCaixasUseCase getAllCaixasUseCase,
            GetCaixaByIdUseCase getCaixaByIdUseCase,
            ListarCaixasDisponiveisUseCase listarCaixasDisponiveisUseCase,
            ListarCaixasAbertosUseCase listarCaixasAbertosUseCase,
            SelecionarCaixaUseCase selecionarCaixaUseCase,
            SairCaixaUseCase sairCaixaUseCase,
            ObterAberturaAtualUseCase obterAberturaAtualUseCase,
            ConferenciaCegaGetUseCase conferenciaCegaGetUseCase,
            ConferenciaCegaPostUseCase conferenciaCegaPostUseCase,
            RegistrarMovimentoCaixaUseCase registrarMovimentoCaixaUseCase)
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
            _obterAberturaAtualUseCase = obterAberturaAtualUseCase;
            _conferenciaCegaGetUseCase = conferenciaCegaGetUseCase;
            _conferenciaCegaPostUseCase = conferenciaCegaPostUseCase;
            _registrarMovimentoCaixaUseCase = registrarMovimentoCaixaUseCase;
        }

        /// <summary>
        /// Obtém a abertura atual. Enviar aberturaId por query (ex.: ?aberturaId=guid) ou o front pode armazenar em cookie e enviar.
        /// </summary>
        [HttpGet]
        [Route("ObterAberturaAtual")]
        [ProducesResponseType(typeof(ResponseAberturaCaixaJSON), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status404NotFound)]
        public IActionResult ObterAberturaAtual([FromQuery] Guid? aberturaId, [FromQuery] Guid? caixaId)
        {
            var aberturaIdFromCookie = Request.Cookies["AberturaId"];
            var id = aberturaId ?? (string.IsNullOrEmpty(aberturaIdFromCookie) ? null : Guid.TryParse(aberturaIdFromCookie, out var guid) ? (Guid?)guid : null);
            if (!id.HasValue && !caixaId.HasValue)
                return BadRequest(new ResponseErrorMessagesJSON(new List<string> { "Informe aberturaId ou caixaId (query ou cookie AberturaId)." }));
            var response = _obterAberturaAtualUseCase.Execute(id, caixaId);
            return Ok(response);
        }

        [HttpGet]
        [Route("Abertura/{aberturaId}/ConferenciaCega")]
        [ProducesResponseType(typeof(ResponseConferenciaCegaJSON), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status404NotFound)]
        public IActionResult GetConferenciaCega([FromRoute] Guid aberturaId)
        {
            var response = _conferenciaCegaGetUseCase.Execute(aberturaId);
            return Ok(response);
        }

        [HttpPost]
        [Route("Abertura/{aberturaId}/ConferenciaCega")]
        [ProducesResponseType(typeof(ResponseConferenciaCegaResultadoJSON), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status404NotFound)]
        public IActionResult PostConferenciaCega([FromRoute] Guid aberturaId, [FromBody] RequestConferenciaCegaJSON request)
        {
            var response = _conferenciaCegaPostUseCase.Execute(aberturaId, request);
            return Ok(response);
        }

        [HttpPost]
        [Route("Abertura/{aberturaId}/Movimento")]
        [ProducesResponseType(typeof(ResponseMovimentoCaixaJSON), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status404NotFound)]
        public IActionResult RegistrarMovimento([FromRoute] Guid aberturaId, [FromBody] RequestMovimentoCaixaJSON request)
        {
            var response = _registrarMovimentoCaixaUseCase.Execute(aberturaId, request);
            return Created(string.Empty, response);
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
            Response.Cookies.Append("AberturaId", response.Id.ToString(), new CookieOptions
            {
                HttpOnly = false,
                SameSite = Microsoft.AspNetCore.Http.SameSiteMode.Lax,
                Path = "/",
                MaxAge = TimeSpan.FromHours(12)
            });
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
        [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status400BadRequest)]
        public IActionResult Selecionar([FromRoute] Guid id)
        {
            var aberturaId = _selecionarCaixaUseCase.Execute(id);
            Response.Cookies.Append("AberturaId", aberturaId.ToString(), new CookieOptions
            {
                HttpOnly = false,
                SameSite = Microsoft.AspNetCore.Http.SameSiteMode.Lax,
                Path = "/",
                MaxAge = TimeSpan.FromHours(12)
            });
            return Ok(new { aberturaId });
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
