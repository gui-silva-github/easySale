using Microsoft.AspNetCore.Mvc;
using EasySale.API.UseCases.Cliente.Delete;
using EasySale.API.UseCases.Cliente.GetAll;
using EasySale.API.UseCases.Cliente.GetById;
using EasySale.API.UseCases.Cliente.Register;
using EasySale.API.UseCases.Cliente.Update;
using Communication.Requests.Cliente;
using Communication.Responses.Cliente;
using Communication.Responses.Error;

namespace EasySale.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly RegisterClienteUseCase _registerClienteUseCase;
        private readonly UpdateClienteUseCase _updateClienteUseCase;
        private readonly GetAllClientesUseCase _getAllClientesUseCase;
        private readonly GetClienteByIdUseCase _getClienteByIdUseCase;
        private readonly DeleteClienteUseCase _deleteClienteUseCase;

        public ClienteController(
            RegisterClienteUseCase registerClienteUseCase,
            UpdateClienteUseCase updateClienteUseCase,
            GetAllClientesUseCase getAllClientesUseCase,
            GetClienteByIdUseCase getClienteByIdUseCase,
            DeleteClienteUseCase deleteClienteUseCase
        )
        {
            _registerClienteUseCase = registerClienteUseCase;
            _updateClienteUseCase = updateClienteUseCase;
            _getAllClientesUseCase = getAllClientesUseCase;
            _getClienteByIdUseCase = getClienteByIdUseCase;
            _deleteClienteUseCase = deleteClienteUseCase;
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseShortClienteJSON), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status400BadRequest)]
        public IActionResult Register([FromBody] RequestClienteJSON request)
        {
            var response = _registerClienteUseCase.Execute(request);
            return Created(string.Empty, response);
        }

        [HttpPut]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status404NotFound)]
        public IActionResult Update([FromRoute] Guid id, [FromBody] RequestClienteJSON request)
        {
            _updateClienteUseCase.Execute(id, request);
            return NoContent();
        }

        [HttpGet]
        [ProducesResponseType(typeof(ResponseAllClientesJSON), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public IActionResult GetAll()
        {
            var response = _getAllClientesUseCase.Execute();

            if (response.Clientes.Count == 0)
                return NoContent();

            return Ok(response);
        }

        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(typeof(ResponseClienteJSON), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status404NotFound)]
        public IActionResult GetById([FromRoute] Guid id)
        {
            var response = _getClienteByIdUseCase.Execute(id);
            return Ok(response);
        }

        [HttpDelete]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ResponseErrorMessagesJSON), StatusCodes.Status404NotFound)]
        public IActionResult Delete([FromRoute] Guid id)
        {
            _deleteClienteUseCase.Execute(id);
            return NoContent();
        }
    }
}
