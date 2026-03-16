using Communication.Requests.Produto;
using Communication.Responses.Produto;
using EasySale.API.Infrastructure;
using EasySale.API.UseCases.Produto.SharedValidator;
using Exceptions.ExceptionsBase;

namespace EasySale.API.UseCases.Produto.Update
{
    public class UpdateProdutoUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public UpdateProdutoUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ResponseProdutoJSON Execute(Guid id, RequestProdutoJSON request)
        {
            Validate(request);

            var produto = _dbContext.Produtos.FirstOrDefault(p => p.Id == id);
            if (produto == null)
                throw new NotFoundException("Produto não encontrado.");

            produto.Nome = request.Nome;
            produto.Marca = request.Marca;
            produto.Preco = request.Preco;
            _dbContext.SaveChanges();

            return new ResponseProdutoJSON
            {
                Id = produto.Id,
                Nome = produto.Nome,
                Marca = produto.Marca,
                Preco = produto.Preco
            };
        }

        private static void Validate(RequestProdutoJSON request)
        {
            var validator = new RequestProdutoValidator();
            var result = validator.Validate(request);
            if (result.IsValid == false)
            {
                var errors = result.Errors.Select(f => f.ErrorMessage).ToList();
                throw new ErrorOnValidateException(errors);
            }
        }
    }
}
