using Communication.Responses.Venda;
using EasySale.API.Infrastructure;
using Exceptions.ExceptionsBase;

namespace EasySale.API.UseCases.Venda.LimparPagamentos
{
    public class LimparPagamentosVendaUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public LimparPagamentosVendaUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ResponseVendaJSON Execute(Guid vendaId)
        {
            var venda = _dbContext.Vendas.FirstOrDefault(v => v.Id == vendaId);
            if (venda == null)
                throw new NotFoundException("Venda não encontrada.");

            if (venda.Status != "Aberta")
                throw new ErrorOnValidateException(new List<string> { "Só é possível limpar pagamentos de venda aberta." });

            var pagamentos = _dbContext.PagamentosVenda.Where(p => p.VendaId == vendaId).ToList();
            _dbContext.PagamentosVenda.RemoveRange(pagamentos);
            _dbContext.SaveChanges();

            var itens = _dbContext.ItensVenda
                .Where(i => i.VendaId == vendaId)
                .Select(i => new ResponseItemVendaJSON
                {
                    Id = i.Id,
                    ProdutoId = i.ProdutoId,
                    ProdutoNome = i.Produto.Nome,
                    Quantidade = i.Quantidade,
                    PrecoUnitario = i.PrecoUnitario,
                    Subtotal = i.Subtotal
                })
                .ToList();

            return new ResponseVendaJSON
            {
                Id = venda.Id,
                AberturaCaixaId = venda.AberturaCaixaId,
                DataVenda = venda.DataVenda,
                ValorTotal = venda.ValorTotal,
                Status = venda.Status,
                Itens = itens,
                Pagamentos = new List<ResponsePagamentoVendaJSON>()
            };
        }
    }
}
