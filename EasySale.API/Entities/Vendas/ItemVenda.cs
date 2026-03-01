using EasySale.API.Entities.Produtos;

namespace EasySale.API.Entities.Vendas
{
    public class ItemVenda : EntityBase
    {
        public Guid VendaId { get; set; }
        public Venda Venda { get; set; } = null!;
        public Guid ProdutoId { get; set; }
        public Produto Produto { get; set; } = null!;
        public int Quantidade { get; set; }
        public decimal PrecoUnitario { get; set; }
        public decimal Subtotal { get; set; }
    }
}
