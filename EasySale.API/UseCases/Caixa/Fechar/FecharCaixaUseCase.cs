using EasySale.API.Infrastructure;
using Exceptions.ExceptionsBase;


namespace EasySale.API.UseCases.Caixa.Fechar
{
    public class FecharCaixaUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public FecharCaixaUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Execute(Guid caixaId)
        {
            var caixa = _dbContext.Caixas.FirstOrDefault(c => c.Id == caixaId);
            if (caixa == null)
                throw new NotFoundException("Caixa não encontrado.");

            var aberturaAtiva = _dbContext.AberturasCaixa
                .FirstOrDefault(a => a.CaixaId == caixaId && a.EstaAberto);

            if (aberturaAtiva == null)
                throw new NotFoundException("Não existe abertura ativa para este caixa.");

            var totalVendas = _dbContext.Vendas
                .Where(v => v.AberturaCaixaId == aberturaAtiva.Id)
                .Sum(v => v.ValorTotal);

            var valorFinal = aberturaAtiva.ValorInicial + totalVendas;

            aberturaAtiva.DataFechamento = DateTime.UtcNow;
            aberturaAtiva.ValorFinal = valorFinal;
            aberturaAtiva.EstaAberto = false;

            caixa.Status = "Fechado";

            _dbContext.SaveChanges();
        }
    }
}
