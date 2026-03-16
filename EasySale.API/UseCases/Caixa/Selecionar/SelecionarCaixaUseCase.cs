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

        public Guid Execute(Guid caixaId)
        {
            var caixa = _dbContext.Caixas.FirstOrDefault(c => c.Id == caixaId);
            if (caixa == null)
                throw new NotFoundException("Caixa não encontrado.");

            if (caixa.Status != "Aberto")
                throw new ErrorOnValidateException(new List<string> { "Caixa não está aberto." });

            var abertura = _dbContext.AberturasCaixa
                .FirstOrDefault(a => a.CaixaId == caixaId && a.EstaAberto);
            if (abertura == null)
                throw new NotFoundException("Abertura ativa não encontrada para este caixa.");

            return abertura.Id;
        }
    }
}
