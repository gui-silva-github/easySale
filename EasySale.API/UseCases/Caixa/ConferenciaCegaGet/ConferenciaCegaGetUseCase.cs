using Communication.Responses.Caixa;
using EasySale.API.Infrastructure;
using Exceptions.ExceptionsBase;

namespace EasySale.API.UseCases.Caixa.ConferenciaCegaGet
{
    public class ConferenciaCegaGetUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public ConferenciaCegaGetUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ResponseConferenciaCegaJSON Execute(Guid aberturaId)
        {
            var abertura = _dbContext.AberturasCaixa.FirstOrDefault(a => a.Id == aberturaId);
            if (abertura == null || !abertura.EstaAberto)
                throw new NotFoundException("Abertura não encontrada ou já fechada.");

            var totalVendas = _dbContext.Vendas
                .Where(v => v.AberturaCaixaId == aberturaId && v.Status == "Finalizada")
                .Sum(v => v.ValorTotal);
            var totalSuprimentos = _dbContext.MovimentosCaixa
                .Where(m => m.AberturaCaixaId == aberturaId && m.Tipo == "Suprimento")
                .Sum(m => m.Valor);
            var totalSangrias = _dbContext.MovimentosCaixa
                .Where(m => m.AberturaCaixaId == aberturaId && m.Tipo == "Sangria")
                .Sum(m => m.Valor);
            var valorEsperado = abertura.ValorInicial + totalVendas + totalSuprimentos - totalSangrias;

            return new ResponseConferenciaCegaJSON
            {
                ValorEsperado = valorEsperado,
                ValorInicial = abertura.ValorInicial,
                TotalVendas = totalVendas,
                TotalSuprimentos = totalSuprimentos,
                TotalSangrias = totalSangrias
            };
        }
    }
}
