using Microsoft.AspNetCore.Mvc;
using EasySale.API.UseCases.Produto.Delete;
using EasySale.API.UseCases.Produto.GetAll;
using EasySale.API.UseCases.Produto.Register;
using Communication.Requests.Produto;
using Communication.Responses.Produto;
using Communication.Responses.Error;

namespace EasySale.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        private readonly GetAllProdutosUseCase _getAllProdutosUseCase;
        private readonly RegisterProdutoUseCase _registerProdutoUseCase;
        private readonly DeleteProdutoUseCase _deleteProdutoUseCase;

        public ProdutoController (
            GetAllProdutosUseCase getAllProdutosUseCase,
            RegisterProdutoUseCase registerProdutoUseCase,
            DeleteProdutoUseCase deleteProdutoUseCase
           )
        {
            _getAllProdutosUseCase = getAllProdutosUseCase;
            _registerProdutoUseCase = registerProdutoUseCase;
            _deleteProdutoUseCase = deleteProdutoUseCase;
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<ResponseProdutoJSON>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public IActionResult GetAll()
        {
            var products = _getAllProdutosUseCase.Execute();

            if (products.Count == 0)
                return NoContent();

            return Ok(products);
        }

        [HttpPost]
        [Route("{clientId}")]
        [ProducesResponseType(typeof(ResponseShortProdutoJSON), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status404NotFound)]
        public IActionResult Register([FromRoute] Guid clientId, [FromBody] RequestProdutoJSON request)
        {
            var response = _registerProdutoUseCase.Execute(clientId, request);
            return Created(string.Empty, response);
        }

        [HttpDelete]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status404NotFound)]
        public IActionResult Delete([FromRoute] Guid id)
        {
            _deleteProdutoUseCase.Execute(id);
            return NoContent();
        }
    }
}
