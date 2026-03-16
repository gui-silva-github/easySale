using Communication.Responses.Caixa;
using EasySale.API.Entities.Caixas;
using EasySale.API.Infrastructure;
using Exceptions.ExceptionsBase;

namespace EasySale.API.UseCases.Caixa.ObterAberturaAtual
{
    public class ObterAberturaAtualUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public ObterAberturaAtualUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ResponseAberturaCaixaJSON Execute(Guid? aberturaId, Guid? caixaId)
        {
            AberturaCaixa? abertura = null;
            if (aberturaId.HasValue)
                abertura = _dbContext.AberturasCaixa.FirstOrDefault(a => a.Id == aberturaId.Value);
            else if (caixaId.HasValue)
                abertura = _dbContext.AberturasCaixa.FirstOrDefault(a => a.CaixaId == caixaId.Value && a.EstaAberto);

            if (abertura == null || !abertura.EstaAberto)
                throw new NotFoundException("Abertura não encontrada ou já fechada.");

            var caixa = _dbContext.Caixas.FirstOrDefault(c => c.Id == abertura.CaixaId);
            var totalVendas = _dbContext.Vendas
                .Where(v => v.AberturaCaixaId == abertura.Id && v.Status == "Finalizada")
                .Sum(v => v.ValorTotal);
            var totalSuprimentos = _dbContext.MovimentosCaixa
                .Where(m => m.AberturaCaixaId == abertura.Id && m.Tipo == "Suprimento")
                .Sum(m => m.Valor);
            var totalSangrias = _dbContext.MovimentosCaixa
                .Where(m => m.AberturaCaixaId == abertura.Id && m.Tipo == "Sangria")
                .Sum(m => m.Valor);
            var saldoEsperado = abertura.ValorInicial + totalVendas + totalSuprimentos - totalSangrias;

            return new ResponseAberturaCaixaJSON
            {
                Id = abertura.Id,
                CaixaId = abertura.CaixaId,
                CaixaDescricao = caixa?.Descricao ?? "",
                DataAbertura = abertura.DataAbertura,
                DataFechamento = abertura.DataFechamento,
                ValorInicial = abertura.ValorInicial,
                ValorFinal = abertura.ValorFinal,
                EstaAberto = abertura.EstaAberto,
                TotalVendas = totalVendas,
                TotalSuprimentos = totalSuprimentos,
                TotalSangrias = totalSangrias,
                SaldoEsperado = saldoEsperado
            };
        }
    }
}
