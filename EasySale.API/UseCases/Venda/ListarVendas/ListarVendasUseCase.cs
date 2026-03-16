using Communication.Responses.Venda;
using EasySale.API.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace EasySale.API.UseCases.Venda.ListarVendas
{
    public class ListarVendasUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public ListarVendasUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ResponseAllVendasJSON Execute(Guid? aberturaId = null)
        {
            var query = _dbContext.Vendas.AsQueryable();

            if (aberturaId.HasValue)
            {
                query = query.Where(v => v.AberturaCaixaId == aberturaId.Value);
            }

            var vendas = query
                .OrderByDescending(v => v.DataVenda)
                .ToList();

            var vendaIds = vendas.Select(v => v.Id).ToList();
            var itens = _dbContext.ItensVenda
                .Where(i => vendaIds.Contains(i.VendaId))
                .Include(i => i.Produto)
                .ToList();
            var pagamentos = _dbContext.PagamentosVenda
                .Where(p => vendaIds.Contains(p.VendaId))
                .Include(p => p.FormaPagamento)
                .ToList();

            var itensPorVenda = itens.GroupBy(i => i.VendaId).ToDictionary(g => g.Key, g => g.ToList());
            var pagamentosPorVenda = pagamentos.GroupBy(p => p.VendaId).ToDictionary(g => g.Key, g => g.ToList());

            var response = vendas.Select(v => new ResponseVendaJSON
            {
                Id = v.Id,
                AberturaCaixaId = v.AberturaCaixaId,
                DataVenda = v.DataVenda,
                ValorTotal = v.ValorTotal,
                Status = v.Status,
                Itens = (itensPorVenda.GetValueOrDefault(v.Id) ?? [])
                    .Select(i => new ResponseItemVendaJSON
                    {
                        Id = i.Id,
                        ProdutoId = i.ProdutoId,
                        ProdutoNome = i.Produto.Nome,
                        Quantidade = i.Quantidade,
                        PrecoUnitario = i.PrecoUnitario,
                        Subtotal = i.Subtotal
                    })
                    .ToList(),
                Pagamentos = (pagamentosPorVenda.GetValueOrDefault(v.Id) ?? [])
                    .Select(p => new ResponsePagamentoVendaJSON
                    {
                        Id = p.Id,
                        FormaPagamentoId = p.FormaPagamentoId,
                        FormaPagamentoDescricao = p.FormaPagamento.Descricao,
                        PermiteTroco = p.FormaPagamento.PermiteTroco,
                        Valor = p.Valor,
                        ValorTroco = p.ValorTroco
                    })
                    .ToList()
            }).ToList();

            return new ResponseAllVendasJSON { Vendas = response };
        }
    }
}
