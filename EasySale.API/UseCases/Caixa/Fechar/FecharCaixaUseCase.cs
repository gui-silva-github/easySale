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
                return;

            var totalVendas = _dbContext.Vendas
                .Where(v => v.AberturaCaixaId == aberturaAtiva.Id && v.Status == "Finalizada")
                .Sum(v => v.ValorTotal);
            var totalSuprimentos = _dbContext.MovimentosCaixa
                .Where(m => m.AberturaCaixaId == aberturaAtiva.Id && m.Tipo == "Suprimento")
                .Sum(m => m.Valor);
            var totalSangrias = _dbContext.MovimentosCaixa
                .Where(m => m.AberturaCaixaId == aberturaAtiva.Id && m.Tipo == "Sangria")
                .Sum(m => m.Valor);

            var valorFinal = aberturaAtiva.ValorInicial + totalVendas + totalSuprimentos - totalSangrias;

            aberturaAtiva.DataFechamento = DateTime.UtcNow;
            aberturaAtiva.ValorFinal = valorFinal;
            aberturaAtiva.EstaAberto = false;

            caixa.Status = "Fechado";

            _dbContext.SaveChanges();
        }
    }
}
