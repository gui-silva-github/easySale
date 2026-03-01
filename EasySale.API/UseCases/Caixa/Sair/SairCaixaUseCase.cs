using Exceptions.ExceptionsBase;
using EasySale.API.Infrastructure;

namespace EasySale.API.UseCases.Caixa.Sair
{
    public class SairCaixaUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public SairCaixaUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Execute(Guid caixaId)
        {
            var caixa = _dbContext.Caixas.FirstOrDefault(c => c.Id == caixaId);
            if (caixa == null)
                throw new NotFoundException("Caixa não encontrado.");
        }
    }
}
