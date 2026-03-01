using EasySale.API.Infrastructure;
using Communication.Responses.Produto;

namespace EasySale.API.UseCases.Produto.GetAll
{
    public class GetAllProdutosUseCase
    {
        private readonly EasySaleDbContext _dbContext;
        public GetAllProdutosUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<ResponseProdutoJSON> Execute()
        {
            var products = _dbContext.Produtos
                .Select(product => new ResponseProdutoJSON
                {
                    Id = product.Id,
                    Nome = product.Nome,
                    Marca = product.Marca,
                    Preco = product.Preco
                })
                .ToList();

            return products;
        }

    }
}
