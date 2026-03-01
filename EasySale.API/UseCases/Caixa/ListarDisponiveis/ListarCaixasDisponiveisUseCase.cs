using Communication.Responses.Caixa;
using EasySale.API.Infrastructure;

namespace EasySale.API.UseCases.Caixa.ListarDisponiveis
{
    public class ListarCaixasDisponiveisUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public ListarCaixasDisponiveisUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ResponseAllCaixasJSON Execute()
        {
            var caixas = _dbContext.Caixas
                .Where(c => c.Status == "Disponivel")
                .Select(caixa => new ResponseCaixaJSON
                {
                    Id = caixa.Id,
                    Descricao = caixa.Descricao,
                    Status = caixa.Status
                })
                .ToList();

            return new ResponseAllCaixasJSON
            {
                Caixas = caixas
            };
        }
    }
}
