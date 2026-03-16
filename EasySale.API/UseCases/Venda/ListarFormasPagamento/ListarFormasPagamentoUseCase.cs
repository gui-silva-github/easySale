using Communication.Responses.Venda;
using EasySale.API.Infrastructure;

namespace EasySale.API.UseCases.Venda.ListarFormasPagamento
{
    public class ListarFormasPagamentoUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public ListarFormasPagamentoUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<ResponseFormaPagamentoJSON> Execute()
        {
            return _dbContext.FormasPagamento
                .OrderBy(f => f.Descricao)
                .Select(f => new ResponseFormaPagamentoJSON
                {
                    Id = f.Id,
                    Descricao = f.Descricao,
                    PermiteTroco = f.PermiteTroco
                })
                .ToList();
        }
    }
}
