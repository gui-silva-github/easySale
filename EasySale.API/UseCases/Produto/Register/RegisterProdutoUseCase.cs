using Communication.Requests.Produto;
using Communication.Responses.Produto;
using EasySale.API.Infrastructure;
using EasySale.API.UseCases.Produto.SharedValidator;
using Exceptions.ExceptionsBase;

namespace EasySale.API.UseCases.Produto.Register
{
    public class RegisterProdutoUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public RegisterProdutoUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ResponseShortProdutoJSON Execute(Guid clientId, RequestProdutoJSON request)
        {
            Validate(_dbContext, clientId, request);

            var entity = new Entities.Produtos.Produto
            {
                Nome = request.Nome,
                Marca = request.Marca,
                Preco = request.Preco,
                ClienteId = clientId,
            };

            _dbContext.Produtos.Add(entity);
            _dbContext.SaveChanges();

            return new ResponseShortProdutoJSON
            {
                Id = entity.Id,
                Nome = entity.Nome,
            };
        }

        private static void Validate(EasySaleDbContext dbContext, Guid clientId, RequestProdutoJSON request)
        {
            var clientExists = dbContext.Clientes.Any(client => client.Id == clientId);


            if (clientExists == false)
                throw new NotFoundException("Cliente não existe.");

            var validator = new RequestProdutoValidator();

            var result = validator.Validate(request);

            if (result.IsValid == false)
            {
                var errors = result.Errors.Select(failure => failure.ErrorMessage).ToList();
                throw new ErrorOnValidateException(errors);
            }
        }
    }
}
