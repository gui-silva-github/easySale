using EasySale.API.Entities.Caixas;

namespace EasySale.API.Entities.Vendas
{
    public class Venda : EntityBase
    {
        public Guid AberturaCaixaId { get; set; }
        public AberturaCaixa AberturaCaixa { get; set; } = null!;
        public DateTime DataVenda { get; set; } = DateTime.UtcNow;
        public decimal ValorTotal { get; set; }
        public List<ItemVenda> Itens { get; set; } = [];
    }
}
