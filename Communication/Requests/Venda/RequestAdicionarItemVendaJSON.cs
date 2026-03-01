namespace Communication.Requests.Venda
{
    public class RequestAdicionarItemVendaJSON
    {
        public Guid ProdutoId { get; set; }
        public int Quantidade { get; set; }
        public decimal? PrecoUnitario { get; set; } // opcional, se não for informado usa o preço do produto
    }
}
