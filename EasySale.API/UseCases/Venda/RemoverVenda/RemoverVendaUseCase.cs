using EasySale.API.Infrastructure;
using Exceptions.ExceptionsBase;

namespace EasySale.API.UseCases.Venda.RemoverVenda
{
    public class RemoverVendaUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public RemoverVendaUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Execute(Guid vendaId)
        {
            var venda = _dbContext.Vendas.FirstOrDefault(v => v.Id == vendaId);
            if (venda == null)
                throw new NotFoundException("Venda não encontrada.");

            if (venda.Status == "Finalizada")
                throw new ErrorOnValidateException(new List<string> { "Não é possível remover venda finalizada." });

            var itens = _dbContext.ItensVenda.Where(i => i.VendaId == vendaId).ToList();
            var pagamentos = _dbContext.PagamentosVenda.Where(p => p.VendaId == vendaId).ToList();
            _dbContext.ItensVenda.RemoveRange(itens);
            _dbContext.PagamentosVenda.RemoveRange(pagamentos);
            _dbContext.Vendas.Remove(venda);
            _dbContext.SaveChanges();
        }
    }
}
