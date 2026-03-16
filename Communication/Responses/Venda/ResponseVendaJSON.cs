namespace Communication.Responses.Venda
{
    public class ResponseVendaJSON
    {
        public Guid Id { get; set; }
        public Guid AberturaCaixaId { get; set; }
        public DateTime DataVenda { get; set; }
        public decimal ValorTotal { get; set; }
        public string Status { get; set; } = "Aberta";
        public List<ResponseItemVendaJSON> Itens { get; set; } = [];
        public List<ResponsePagamentoVendaJSON> Pagamentos { get; set; } = [];
    }
}
