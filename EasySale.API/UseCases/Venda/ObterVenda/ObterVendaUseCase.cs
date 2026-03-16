using Communication.Responses.Venda;
using EasySale.API.Infrastructure;
using Exceptions.ExceptionsBase;

namespace EasySale.API.UseCases.Venda.ObterVenda
{
    public class ObterVendaUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public ObterVendaUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ResponseVendaJSON Execute(Guid vendaId)
        {
            var venda = _dbContext.Vendas.FirstOrDefault(v => v.Id == vendaId);
            if (venda == null)
                throw new NotFoundException("Venda não encontrada.");

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

            var pagamentos = _dbContext.PagamentosVenda
                .Where(p => p.VendaId == vendaId)
                .Select(p => new ResponsePagamentoVendaJSON
                {
                    Id = p.Id,
                    FormaPagamentoId = p.FormaPagamentoId,
                    FormaPagamentoDescricao = p.FormaPagamento.Descricao,
                    PermiteTroco = p.FormaPagamento.PermiteTroco,
                    Valor = p.Valor,
                    ValorTroco = p.ValorTroco
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
                Pagamentos = pagamentos
            };
        }
    }
}
