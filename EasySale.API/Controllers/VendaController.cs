using Microsoft.AspNetCore.Mvc;
using EasySale.API.UseCases.Venda.AdicionarItem;
using EasySale.API.UseCases.Venda.CriarVenda;
using EasySale.API.UseCases.Venda.FinalizarVenda;
using EasySale.API.UseCases.Venda.ListarVendas;
using EasySale.API.UseCases.Venda.ObterVenda;
using EasySale.API.UseCases.Venda.RemoverItem;
using Communication.Requests.Venda;
using Communication.Responses.Venda;
using Communication.Responses.Error;

namespace EasySale.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendaController : ControllerBase
    {
        private readonly CriarVendaUseCase _criarVendaUseCase;
        private readonly AdicionarItemVendaUseCase _adicionarItemVendaUseCase;
        private readonly RemoverItemVendaUseCase _removerItemVendaUseCase;
        private readonly ObterVendaUseCase _obterVendaUseCase;
        private readonly FinalizarVendaUseCase _finalizarVendaUseCase;
        private readonly ListarVendasUseCase _listarVendasUseCase;

        public VendaController(
            CriarVendaUseCase criarVendaUseCase,
            AdicionarItemVendaUseCase adicionarItemVendaUseCase,
            RemoverItemVendaUseCase removerItemVendaUseCase,
            ObterVendaUseCase obterVendaUseCase,
            FinalizarVendaUseCase finalizarVendaUseCase,
            ListarVendasUseCase listarVendasUseCase
        )
        {
            _criarVendaUseCase = criarVendaUseCase; 
            _adicionarItemVendaUseCase = adicionarItemVendaUseCase;
            _removerItemVendaUseCase = removerItemVendaUseCase;
            _obterVendaUseCase = obterVendaUseCase;
            _finalizarVendaUseCase = finalizarVendaUseCase;
            _listarVendasUseCase = listarVendasUseCase;
        }

        [HttpPost]
        [Route("Abertura/{aberturaId}/Criar")]
        [ProducesResponseType(typeof(ResponseVendaJSON), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status404NotFound)]
        public IActionResult CriarVenda([FromRoute] Guid aberturaId)
        {
            var response = _criarVendaUseCase.Execute(aberturaId);
            return Created(string.Empty, response);
        }

        [HttpPost]
        [Route("{vendaId}/AdicionarItem")]
        [ProducesResponseType(typeof(ResponseVendaJSON), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status404NotFound)]
        public IActionResult AdicionarItem([FromRoute] Guid vendaId, [FromBody] RequestAdicionarItemVendaJSON request)
        {
            var response = _adicionarItemVendaUseCase.Execute(vendaId, request);
            return Ok(response);
        }

        [HttpDelete]
        [Route("{vendaId}/Itens/{itemId}")]
        [ProducesResponseType(typeof(ResponseVendaJSON), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status404NotFound)]
        public IActionResult RemoverItem([FromRoute] Guid vendaId, [FromRoute] Guid itemId)
        {
            var response = _removerItemVendaUseCase.Execute(vendaId, itemId);
            return Ok(response);
        }

        [HttpGet]
        [Route("Listar")]
        [ProducesResponseType(typeof(ResponseAllVendasJSON), StatusCodes.Status200OK)]
        public IActionResult Listar([FromQuery] Guid? aberturaId)
        {
            var response = _listarVendasUseCase.Execute(aberturaId);
            return Ok(response);
        }

        [HttpGet]
        [Route("{vendaId}")]
        [ProducesResponseType(typeof(ResponseVendaJSON), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status404NotFound)]
        public IActionResult ObterVenda([FromRoute] Guid vendaId)
        {
            var response = _obterVendaUseCase.Execute(vendaId);
            return Ok(response);
        }

        [HttpPost]
        [Route("{vendaId}/Finalizar")]
        [ProducesResponseType(typeof(ResponseVendaJSON), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status404NotFound)]
        public IActionResult FinalizarVenda([FromRoute] Guid vendaId)
        {
            var response = _finalizarVendaUseCase.Execute(vendaId);
            return Ok(response);
        }
    }
}
