using Communication.Responses.Cliente;
using Communication.Responses.Produto;
using EasySale.API.Infrastructure;
using Exceptions.ExceptionsBase;
using Microsoft.EntityFrameworkCore;

namespace EasySale.API.UseCases.Cliente.GetById
{
    public class GetClienteByIdUseCase
    {
        private readonly EasySaleDbContext _dbContext;


        public GetClienteByIdUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ResponseClienteJSON Execute(Guid id)
        {
            var entity = _dbContext.Clientes.Include(client => client.Produtos).FirstOrDefault(client => client.Id == id);


            if (entity is null)
                throw new NotFoundException("Cliente não encontrado.");


            return new ResponseClienteJSON
            {
                Id = entity.Id,
                Nome = entity.Nome,
                Email = entity.Email,
                Produtos = entity.Produtos.Select(product => new ResponseShortProdutoJSON
                {
                    Id = product.Id,
                    Nome = product.Nome,
                }).ToList()
            };
        }

    }
}
