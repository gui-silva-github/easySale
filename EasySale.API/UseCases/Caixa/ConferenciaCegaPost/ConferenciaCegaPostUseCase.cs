using Communication.Requests.Caixa;
using Communication.Responses.Caixa;
using EasySale.API.Infrastructure;
using Exceptions.ExceptionsBase;

namespace EasySale.API.UseCases.Caixa.ConferenciaCegaPost
{
    public class ConferenciaCegaPostUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public ConferenciaCegaPostUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ResponseConferenciaCegaResultadoJSON Execute(Guid aberturaId, RequestConferenciaCegaJSON request)
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
            var diferenca = request.ValorInformado - valorEsperado;
            var batido = Math.Abs(diferenca) < 0.01m;

            return new ResponseConferenciaCegaResultadoJSON
            {
                ValorEsperado = valorEsperado,
                ValorInformado = request.ValorInformado,
                Diferenca = diferenca,
                Batido = batido
            };
        }
    }
}
