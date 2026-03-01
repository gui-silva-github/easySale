using Communication.Requests.Caixa;
using Communication.Responses.Caixa;
using EasySale.API.Infrastructure;
using EasySale.API.UseCases.Caixa.SharedValidator;
using Exceptions.ExceptionsBase;

namespace EasySale.API.UseCases.Caixa.Abrir
{
    public class AbrirCaixaUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public AbrirCaixaUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ResponseAberturaCaixaJSON Execute(Guid caixaId, RequestAbrirCaixaJSON request)
        {
            Validate(request);

            var caixa = _dbContext.Caixas.FirstOrDefault(c => c.Id == caixaId);
            if (caixa == null)
                throw new NotFoundException("Caixa não encontrado.");

            if (caixa.Status != "Disponivel")
                throw new ErrorOnValidateException(new List<string> { "Caixa não está disponível para abertura." });

            var aberturaAtiva = _dbContext.AberturasCaixa
                .FirstOrDefault(a => a.CaixaId == caixaId && a.EstaAberto);

            if (aberturaAtiva != null)
                throw new ErrorOnValidateException(new List<string> { "Já existe uma abertura ativa para este caixa." });

            var abertura = new Entities.Caixas.AberturaCaixa
            {
                CaixaId = caixaId,
                ValorInicial = request.ValorInicial,
                EstaAberto = true,
                DataAbertura = DateTime.UtcNow
            };
            caixa.Status = "Aberto";

            _dbContext.AberturasCaixa.Add(abertura);
            _dbContext.SaveChanges();

            return new ResponseAberturaCaixaJSON
            {
                Id = abertura.Id,
                CaixaId = abertura.CaixaId,
                DataAbertura = abertura.DataAbertura,
                ValorInicial = abertura.ValorInicial,
                EstaAberto = abertura.EstaAberto
            };
        }

        private static void Validate(RequestAbrirCaixaJSON request)
        {
            var validator = new RequestAbrirCaixaValidator();
            var result = validator.Validate(request);

            if (result.IsValid == false)
            {
                var errors = result.Errors.Select(failure => failure.ErrorMessage).ToList();
                throw new ErrorOnValidateException(errors);
            }
        }
    }
}
