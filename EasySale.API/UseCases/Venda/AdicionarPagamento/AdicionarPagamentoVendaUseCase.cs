using Communication.Requests.Venda;
using Communication.Responses.Venda;
using EasySale.API.Infrastructure;
using Exceptions.ExceptionsBase;

namespace EasySale.API.UseCases.Venda.AdicionarPagamento
{
    public class AdicionarPagamentoVendaUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public AdicionarPagamentoVendaUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ResponseVendaJSON Execute(Guid vendaId, RequestAdicionarPagamentoJSON request)
        {
            if (request.Valor <= 0)
                throw new ErrorOnValidateException(new List<string> { "Valor do pagamento deve ser maior que zero." });

            var venda = _dbContext.Vendas.FirstOrDefault(v => v.Id == vendaId);
            if (venda == null)
                throw new NotFoundException("Venda não encontrada.");

            if (venda.Status != "Aberta")
                throw new ErrorOnValidateException(new List<string> { "Só é possível adicionar pagamento em venda aberta." });

            var forma = _dbContext.FormasPagamento.FirstOrDefault(f => f.Id == request.FormaPagamentoId);
            if (forma == null)
                throw new NotFoundException("Forma de pagamento não encontrada.");

            if (forma.PermiteTroco && request.ValorTroco.HasValue && request.ValorTroco < 0)
                throw new ErrorOnValidateException(new List<string> { "Valor de troco inválido." });

            if (!forma.PermiteTroco && request.ValorTroco.HasValue && request.ValorTroco != 0)
                throw new ErrorOnValidateException(new List<string> { "Esta forma de pagamento não permite troco." });

            var pagamento = new Entities.Vendas.PagamentoVenda
            {
                VendaId = vendaId,
                FormaPagamentoId = request.FormaPagamentoId,
                Valor = request.Valor,
                ValorTroco = forma.PermiteTroco ? request.ValorTroco : null
            };

            _dbContext.PagamentosVenda.Add(pagamento);
            _dbContext.SaveChanges();

            return BuildResponse(vendaId);
        }

        private ResponseVendaJSON BuildResponse(Guid vendaId)
        {
            var venda = _dbContext.Vendas.First(v => v.Id == vendaId);
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
