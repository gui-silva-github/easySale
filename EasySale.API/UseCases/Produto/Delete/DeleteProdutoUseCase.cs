using EasySale.API.Infrastructure;
using Exceptions.ExceptionsBase;

namespace EasySale.API.UseCases.Produto.Delete
{
    public class DeleteProdutoUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public DeleteProdutoUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Execute(Guid id)
        {
            var entity = _dbContext.Produtos.FirstOrDefault(product => product.Id == id);

            if (entity is null)
                throw new NotFoundException("Produto não encontrado.");

            _dbContext.Produtos.Remove(entity);

            _dbContext.SaveChanges();
        }

    }
}
