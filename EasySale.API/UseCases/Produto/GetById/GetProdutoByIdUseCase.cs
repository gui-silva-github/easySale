using Communication.Responses.Produto;
using EasySale.API.Infrastructure;
using Exceptions.ExceptionsBase;

namespace EasySale.API.UseCases.Produto.GetById
{
    public class GetProdutoByIdUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public GetProdutoByIdUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ResponseProdutoJSON Execute(Guid id)
        {
            var produto = _dbContext.Produtos.FirstOrDefault(p => p.Id == id);
            if (produto == null)
                throw new NotFoundException("Produto não encontrado.");

            return new ResponseProdutoJSON
            {
                Id = produto.Id,
                Nome = produto.Nome,
                Marca = produto.Marca,
                Preco = produto.Preco
            };
        }
    }
}
