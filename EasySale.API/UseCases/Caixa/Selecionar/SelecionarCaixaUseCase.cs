using EasySale.API.Infrastructure;
using Exceptions.ExceptionsBase;

namespace EasySale.API.UseCases.Caixa.Selecionar
{
    public class SelecionarCaixaUseCase
    {
        private readonly EasySaleDbContext _dbContext;


        public SelecionarCaixaUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Execute(Guid caixaId)
        {
            var caixa = _dbContext.Caixas.FirstOrDefault(c => c.Id == caixaId);
            if (caixa == null)
                throw new NotFoundException("Caixa não encontrado.");

            if (caixa.Status != "Aberto")
                throw new ErrorOnValidateException(new List<string> { "Caixa não está aberto." });
        }
    }
}
