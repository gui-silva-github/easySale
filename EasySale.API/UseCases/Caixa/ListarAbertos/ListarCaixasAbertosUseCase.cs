using Communication.Responses.Caixa;
using EasySale.API.Infrastructure;

namespace EasySale.API.UseCases.Caixa.ListarAbertos
{
    public class ListarCaixasAbertosUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public ListarCaixasAbertosUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ResponseAllCaixasJSON Execute()
        {
            var caixas = _dbContext.Caixas
                .Where(c => c.Status == "Aberto")
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
