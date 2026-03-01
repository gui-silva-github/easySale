using EasySale.API.Infrastructure;
using Exceptions.ExceptionsBase;

namespace EasySale.API.UseCases.Cliente.Delete
{
    public class DeleteClienteUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public DeleteClienteUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Execute(Guid id)
        {
            var entity = _dbContext.Clientes.FirstOrDefault(client => client.Id == id);
            if (entity == null)
                throw new NotFoundException("Cliente não encontrado.");


            _dbContext.Clientes.Remove(entity);


            _dbContext.SaveChanges();
        }
    }
}
