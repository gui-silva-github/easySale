using Communication.Responses.Venda;
using EasySale.API.Infrastructure;
using Exceptions.ExceptionsBase;

namespace EasySale.API.UseCases.Venda.RemoverItem
{
    public class RemoverItemVendaUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public RemoverItemVendaUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ResponseVendaJSON Execute(Guid vendaId, Guid itemId)
        {
            var venda = _dbContext.Vendas.FirstOrDefault(v => v.Id == vendaId);
            if (venda == null)
                throw new NotFoundException("Venda não encontrada.");

            var item = _dbContext.ItensVenda.FirstOrDefault(i => i.VendaId == itemId && i.VendaId == vendaId);
            if (item == null)
                throw new NotFoundException("Item não encontrado na venda.");

            _dbContext.ItensVenda.Remove(item);

            venda.ValorTotal = _dbContext.ItensVenda
                .Where(i => i.VendaId == vendaId)
                .Sum(i => i.Subtotal);

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
                Itens = itens
            };
        }
    }
}
