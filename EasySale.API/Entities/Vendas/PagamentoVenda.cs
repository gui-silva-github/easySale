namespace EasySale.API.Entities.Vendas
{
    public class PagamentoVenda : EntityBase
    {
        public Guid VendaId { get; set; }
        public Venda Venda { get; set; } = null!;
        public Guid FormaPagamentoId { get; set; }
        public FormaPagamento FormaPagamento { get; set; } = null!;
        public decimal Valor { get; set; }
        public decimal? ValorTroco { get; set; }
    }
}
