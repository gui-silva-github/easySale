using Communication.Responses.Caixa;
using EasySale.API.Infrastructure;
using Exceptions.ExceptionsBase;

namespace EasySale.API.UseCases.Caixa.GetById
{
    public class GetCaixaByIdUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public GetCaixaByIdUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ResponseCaixaJSON Execute(Guid id)
        {
            var caixa = _dbContext.Caixas.FirstOrDefault(c => c.Id == id);

            if (caixa == null)
                throw new NotFoundException("Caixa não encontrado.");

            return new ResponseCaixaJSON
            {
                Id = caixa.Id,
                Descricao = caixa.Descricao,
                Status = caixa.Status
            };
        }
    }
}
