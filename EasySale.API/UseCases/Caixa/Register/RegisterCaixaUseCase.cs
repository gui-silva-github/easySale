using Communication.Requests.Caixa;
using Communication.Responses.Caixa;
using EasySale.API.Infrastructure;
using EasySale.API.UseCases.Caixa.SharedValidator;
using Exceptions.ExceptionsBase;

namespace EasySale.API.UseCases.Caixa.Register
{
    public class RegisterCaixaUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public RegisterCaixaUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ResponseCaixaJSON Execute(RequestCaixaJSON request)
        {
            Validate(request);

            var entity = new Entities.Caixas.Caixa
            {
                Descricao = request.Descricao,
                Status = "Disponivel"
            };

            _dbContext.Caixas.Add(entity);
            _dbContext.SaveChanges();

            return new ResponseCaixaJSON
            {
                Id = entity.Id,
                Descricao = entity.Descricao,
                Status = entity.Status
            };
        }

        private static void Validate(RequestCaixaJSON request)
        {
            var validator = new RequestCaixaValidator();
            var result = validator.Validate(request);


            if (result.IsValid == false)
            {
                var errors = result.Errors.Select(failure => failure.ErrorMessage).ToList();
                throw new ErrorOnValidateException(errors);
            }
        }
    }
}
