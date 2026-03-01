namespace Communication.Requests.Produto
{
    public class RequestProdutoJSON
    {
        public string Nome { get; set; } = string.Empty;
        public string Marca {  get; set; } = string.Empty;
        public decimal Preco {  get; set; }
    }
}
