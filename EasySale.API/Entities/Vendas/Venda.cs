using EasySale.API.Entities.Caixas;

namespace EasySale.API.Entities.Vendas
{
    public class Venda : EntityBase
    {
        public Guid AberturaCaixaId { get; set; }
        public AberturaCaixa AberturaCaixa { get; set; } = null!;
        public DateTime DataVenda { get; set; } = DateTime.UtcNow;
        public decimal ValorTotal { get; set; }
        public string Status { get; set; } = "Aberta"; // Aberta | Finalizada | Cancelada
        public List<ItemVenda> Itens { get; set; } = [];
        public List<PagamentoVenda> Pagamentos { get; set; } = [];
    }
}
