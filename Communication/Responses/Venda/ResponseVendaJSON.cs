namespace Communication.Responses.Venda
{
    public class ResponseVendaJSON
    {
        public Guid Id { get; set; }
        public Guid AberturaCaixaId { get; set; }
        public DateTime DataVenda { get; set; }
        public decimal ValorTotal { get; set; }
        public List<ResponseItemVendaJSON> Itens { get; set; } = [];
    }
}
