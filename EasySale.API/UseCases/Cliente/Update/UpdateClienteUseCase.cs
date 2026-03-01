using Communication.Requests.Cliente;
using EasySale.API.Infrastructure;
using EasySale.API.UseCases.Cliente.SharedValidator;
using Exceptions.ExceptionsBase;

namespace EasySale.API.UseCases.Cliente.Update
{
    public class UpdateClienteUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public UpdateClienteUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Execute(Guid clientId, RequestClienteJSON request)
        {
            Validate(request);

            var entity = _dbContext.Clientes.FirstOrDefault(client => client.Id == clientId);

            if (entity is null)
            {
                throw new NotFoundException("Cliente não encontrado.");
            }

            entity.Nome = request.Nome;
            entity.Email = request.Email;

            _dbContext.Clientes.Update(entity);
            _dbContext.SaveChanges();
        }


        private static void Validate(RequestClienteJSON request)
        {
            var validator = new RequestClienteValidator();


            var result = validator.Validate(request);


            if (result.IsValid == false)
            {
                var errors = result.Errors.Select(failure => failure.ErrorMessage).ToList();
                throw new ErrorOnValidateException(errors);
            }
        }

    }
}
