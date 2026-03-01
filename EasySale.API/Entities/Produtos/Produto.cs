namespace EasySale.API.Entities.Produtos
{
    public class Produto : EntityBase
    {
        public string Nome { get; set; } = string.Empty;
        public string Marca { get; set; } = string.Empty;
        public decimal Preco { get; set; }
        public Guid ClienteId { get; set; }
    }
}
