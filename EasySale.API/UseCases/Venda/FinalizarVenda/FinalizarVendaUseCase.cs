using Communication.Responses.Venda;
using EasySale.API.Infrastructure;
using Exceptions.ExceptionsBase;

namespace EasySale.API.UseCases.Venda.FinalizarVenda
{
    public class FinalizarVendaUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public FinalizarVendaUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ResponseVendaJSON Execute(Guid vendaId)
        {
            var venda = _dbContext.Vendas.FirstOrDefault(v => v.Id == vendaId);
            if (venda == null)
                throw new NotFoundException("Venda não encontrada.");

            if (venda.Status == "Finalizada")
                throw new ErrorOnValidateException(new List<string> { "Venda já está finalizada." });

            var totalItens = _dbContext.ItensVenda.Where(i => i.VendaId == vendaId).Sum(i => i.Subtotal);
            if (totalItens <= 0)
                throw new ErrorOnValidateException(new List<string> { "Adicione ao menos um item à venda para finalizar." });

            var totalPagamentos = _dbContext.PagamentosVenda
                .Where(p => p.VendaId == vendaId)
                .Sum(p => p.Valor);
            if (Math.Abs(totalPagamentos - totalItens) > 0.01m)
                throw new ErrorOnValidateException(new List<string>
                {
                    $"Total dos pagamentos (R$ {totalPagamentos:N2}) deve ser igual ao valor da venda (R$ {totalItens:N2})."
                });

            venda.ValorTotal = totalItens;
            venda.Status = "Finalizada";
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