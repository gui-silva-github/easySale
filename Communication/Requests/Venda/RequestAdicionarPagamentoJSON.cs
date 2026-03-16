namespace Communication.Requests.Venda
{
    public class RequestAdicionarPagamentoJSON
    {
        public Guid FormaPagamentoId { get; set; }
        public decimal Valor { get; set; }
        public decimal? ValorTroco { get; set; }
    }
}
