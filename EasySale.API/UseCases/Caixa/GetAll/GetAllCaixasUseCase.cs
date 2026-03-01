using Communication.Responses.Caixa;
using EasySale.API.Infrastructure;

namespace EasySale.API.UseCases.Caixa.GetAll
{
    public class GetAllCaixasUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public GetAllCaixasUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ResponseAllCaixasJSON Execute()
        {
            var caixas = _dbContext.Caixas
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
