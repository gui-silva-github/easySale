using Communication.Responses.Produto;

namespace Communication.Responses.Cliente
{
    public class ResponseClienteJSON
    {
        public Guid Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public List<ResponseShortProdutoJSON> Produtos { get; set; } = [];
    }
}
