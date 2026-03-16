using Communication.Requests.Caixa;
using Communication.Responses.Caixa;
using EasySale.API.Infrastructure;
using Exceptions.ExceptionsBase;

namespace EasySale.API.UseCases.Caixa.RegistrarMovimento
{
    public class RegistrarMovimentoCaixaUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public RegistrarMovimentoCaixaUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ResponseMovimentoCaixaJSON Execute(Guid aberturaId, RequestMovimentoCaixaJSON request)
        {
            if (request.Valor <= 0)
                throw new ErrorOnValidateException(new List<string> { "Valor deve ser maior que zero." });

            if (request.Tipo != "Suprimento" && request.Tipo != "Sangria")
                throw new ErrorOnValidateException(new List<string> { "Tipo deve ser Suprimento ou Sangria." });

            var abertura = _dbContext.AberturasCaixa.FirstOrDefault(a => a.Id == aberturaId);
            if (abertura == null || !abertura.EstaAberto)
                throw new NotFoundException("Abertura não encontrada ou já fechada.");

            var movimento = new Entities.Caixas.MovimentoCaixa
            {
                AberturaCaixaId = aberturaId,
                Tipo = request.Tipo,
                Valor = request.Valor,
                Observacao = request.Observacao,
                DataMovimento = DateTime.UtcNow
            };

            _dbContext.MovimentosCaixa.Add(movimento);
            _dbContext.SaveChanges();

            return new ResponseMovimentoCaixaJSON
            {
                Id = movimento.Id,
                Tipo = movimento.Tipo,
                Valor = movimento.Valor,
                DataMovimento = movimento.DataMovimento,
                Observacao = movimento.Observacao
            };
        }
    }
}
