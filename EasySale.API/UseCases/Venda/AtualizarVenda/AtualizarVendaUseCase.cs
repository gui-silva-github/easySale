using Communication.Requests.Venda;
using Communication.Responses.Venda;
using EasySale.API.Infrastructure;
using Exceptions.ExceptionsBase;

namespace EasySale.API.UseCases.Venda.AtualizarVenda
{
    public class AtualizarVendaUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public AtualizarVendaUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ResponseVendaJSON Execute(Guid vendaId, RequestAtualizarVendaJSON request)
        {
            var venda = _dbContext.Vendas.FirstOrDefault(v => v.Id == vendaId);
            if (venda == null)
                throw new NotFoundException("Venda não encontrada.");

            if (venda.Status != "Aberta")
                throw new ErrorOnValidateException(new List<string> { "Só é possível editar venda aberta." });

            if (request.Itens != null && request.Itens.Count > 0)
            {
                var itensAtuais = _dbContext.ItensVenda.Where(i => i.VendaId == vendaId).ToList();
                _dbContext.ItensVenda.RemoveRange(itensAtuais);

                foreach (var item in request.Itens)
                {
                    var produto = _dbContext.Produtos.FirstOrDefault(p => p.Id == item.ProdutoId);
                    if (produto == null)
                        throw new NotFoundException($"Produto {item.ProdutoId} não encontrado.");
                    var preco = item.PrecoUnitario ?? produto.Preco;
                    var subtotal = preco * item.Quantidade;
                    _dbContext.ItensVenda.Add(new Entities.Vendas.ItemVenda
                    {
                        VendaId = vendaId,
                        ProdutoId = item.ProdutoId,
                        Quantidade = item.Quantidade,
                        PrecoUnitario = preco,
                        Subtotal = subtotal
                    });
                }

                venda.ValorTotal = _dbContext.ItensVenda.Where(i => i.VendaId == vendaId).Sum(i => i.Subtotal);
            }

            _dbContext.SaveChanges();

            var itensResp = _dbContext.ItensVenda
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
                Itens = itensResp,
                Pagamentos = pagamentos
            };
        }
    }
}
