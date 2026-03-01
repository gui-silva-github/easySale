using EasySale.API.Infrastructure;
using Communication.Responses.Cliente;

namespace EasySale.API.UseCases.Cliente.GetAll
{
    public class GetAllClientesUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public GetAllClientesUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ResponseAllClientesJSON Execute()
        {
            var clients = _dbContext.Clientes.ToList();

            return new ResponseAllClientesJSON
            {
                Clientes = clients.Select(client => new ResponseShortClienteJSON
                {
                    Id = client.Id,
                    Nome = client.Nome,
                }).ToList()
            };
        }

    }
}
