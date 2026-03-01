using Communication.Requests.Cliente;
using Communication.Responses.Cliente;
using EasySale.API.Infrastructure;
using EasySale.API.UseCases.Cliente.SharedValidator;
using Exceptions.ExceptionsBase;

namespace EasySale.API.UseCases.Cliente.Register
{
    public class RegisterClienteUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public RegisterClienteUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ResponseShortClienteJSON Execute(RequestClienteJSON request)
        {
            Validate(request);

            var entity = new Entities.Clientes.Cliente
            {
                Nome = request.Nome,
                Email = request.Email,
            };

            _dbContext.Clientes.Add(entity);
            _dbContext.SaveChanges();

            return new ResponseShortClienteJSON
            {
                Id = entity.Id,
                Nome = entity.Nome,
            };
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
