namespace Communication.Responses.Venda
{
    public class ResponsePagamentoVendaJSON
    {
        public Guid Id { get; set; }
        public Guid FormaPagamentoId { get; set; }
        public string FormaPagamentoDescricao { get; set; } = string.Empty;
        public bool PermiteTroco { get; set; }
        public decimal Valor { get; set; }
        public decimal? ValorTroco { get; set; }
    }
}
