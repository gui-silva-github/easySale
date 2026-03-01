namespace Communication.Responses.Produto
{
    public class ResponseProdutoJSON
    {
        public Guid Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Marca { get; set; } = string.Empty;
        public decimal Preco { get; set; }
    }
}