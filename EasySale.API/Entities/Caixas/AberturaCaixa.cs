using EasySale.API.Entities.Vendas;

namespace EasySale.API.Entities.Caixas
{
    public class AberturaCaixa : EntityBase
    {
        public Guid CaixaId { get; set; }
        public Caixa Caixa { get; set; } = null!;
        public DateTime DataAbertura { get; set; } = DateTime.UtcNow;
        public DateTime? DataFechamento { get; set; }
        public decimal ValorInicial { get; set; }
        public decimal? ValorFinal { get; set; }
        public bool EstaAberto { get; set; }
        public List<Venda> Vendas { get; set; } = [];
    }
}
