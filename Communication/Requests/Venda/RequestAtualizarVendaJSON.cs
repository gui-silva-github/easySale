namespace Communication.Requests.Venda
{
    public class RequestAtualizarVendaJSON
    {
        public List<RequestItemVendaJSON>? Itens { get; set; }
    }

    public class RequestItemVendaJSON
    {
        public Guid? ItemId { get; set; }
        public Guid ProdutoId { get; set; }
        public int Quantidade { get; set; }
        public decimal? PrecoUnitario { get; set; }
    }
}
