using Microsoft.AspNetCore.Mvc;
using EasySale.API.UseCases.Venda.AdicionarItem;
using EasySale.API.UseCases.Venda.AdicionarPagamento;
using EasySale.API.UseCases.Venda.AtualizarVenda;
using EasySale.API.UseCases.Venda.CriarVenda;
using EasySale.API.UseCases.Venda.FinalizarVenda;
using EasySale.API.UseCases.Venda.LimparPagamentos;
using EasySale.API.UseCases.Venda.ListarFormasPagamento;
using EasySale.API.UseCases.Venda.ListarVendas;
using EasySale.API.UseCases.Venda.ObterVenda;
using EasySale.API.UseCases.Venda.RemoverItem;
using EasySale.API.UseCases.Venda.RemoverVenda;
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
        private readonly AtualizarVendaUseCase _atualizarVendaUseCase;
        private readonly RemoverVendaUseCase _removerVendaUseCase;
        private readonly AdicionarPagamentoVendaUseCase _adicionarPagamentoVendaUseCase;
        private readonly LimparPagamentosVendaUseCase _limparPagamentosVendaUseCase;
        private readonly ListarFormasPagamentoUseCase _listarFormasPagamentoUseCase;

        public VendaController(
            CriarVendaUseCase criarVendaUseCase,
            AdicionarItemVendaUseCase adicionarItemVendaUseCase,
            RemoverItemVendaUseCase removerItemVendaUseCase,
            ObterVendaUseCase obterVendaUseCase,
            FinalizarVendaUseCase finalizarVendaUseCase,
            ListarVendasUseCase listarVendasUseCase,
            AtualizarVendaUseCase atualizarVendaUseCase,
            RemoverVendaUseCase removerVendaUseCase,
            AdicionarPagamentoVendaUseCase adicionarPagamentoVendaUseCase,
            LimparPagamentosVendaUseCase limparPagamentosVendaUseCase,
            ListarFormasPagamentoUseCase listarFormasPagamentoUseCase
        )
        {
            _criarVendaUseCase = criarVendaUseCase;
            _adicionarItemVendaUseCase = adicionarItemVendaUseCase;
            _removerItemVendaUseCase = removerItemVendaUseCase;
            _obterVendaUseCase = obterVendaUseCase;
            _finalizarVendaUseCase = finalizarVendaUseCase;
            _listarVendasUseCase = listarVendasUseCase;
            _atualizarVendaUseCase = atualizarVendaUseCase;
            _removerVendaUseCase = removerVendaUseCase;
            _adicionarPagamentoVendaUseCase = adicionarPagamentoVendaUseCase;
            _limparPagamentosVendaUseCase = limparPagamentosVendaUseCase;
            _listarFormasPagamentoUseCase = listarFormasPagamentoUseCase;
        }

        [HttpGet]
        [Route("FormasPagamento")]
        [ProducesResponseType(typeof(List<ResponseFormaPagamentoJSON>), StatusCodes.Status200OK)]
        public IActionResult ListarFormasPagamento()
        {
            var response = _listarFormasPagamentoUseCase.Execute();
            return Ok(response);
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

        [HttpPut]
        [Route("{vendaId}")]
        [ProducesResponseType(typeof(ResponseVendaJSON), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status404NotFound)]
        public IActionResult AtualizarVenda([FromRoute] Guid vendaId, [FromBody] RequestAtualizarVendaJSON request)
        {
            var response = _atualizarVendaUseCase.Execute(vendaId, request);
            return Ok(response);
        }

        [HttpDelete]
        [Route("{vendaId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status404NotFound)]
        public IActionResult RemoverVenda([FromRoute] Guid vendaId)
        {
            _removerVendaUseCase.Execute(vendaId);
            return NoContent();
        }

        [HttpPost]
        [Route("{vendaId}/Pagamentos")]
        [ProducesResponseType(typeof(ResponseVendaJSON), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status404NotFound)]
        public IActionResult AdicionarPagamento([FromRoute] Guid vendaId, [FromBody] RequestAdicionarPagamentoJSON request)
        {
            var response = _adicionarPagamentoVendaUseCase.Execute(vendaId, request);
            return Ok(response);
        }

        [HttpDelete]
        [Route("{vendaId}/Pagamentos")]
        [ProducesResponseType(typeof(ResponseVendaJSON), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status404NotFound)]
        public IActionResult LimparPagamentos([FromRoute] Guid vendaId)
        {
            var response = _limparPagamentosVendaUseCase.Execute(vendaId);
            return Ok(response);
        }

        [HttpPost]
        [Route("{vendaId}/Finalizar")]
        [ProducesResponseType(typeof(ResponseVendaJSON), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status404NotFound)]
        public IActionResult FinalizarVenda([FromRoute] Guid vendaId)
        {
            var response = _finalizarVendaUseCase.Execute(vendaId);
            return Ok(response);
        }
    }
}
