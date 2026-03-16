namespace EasySale.API.Entities.Caixas
{
    public class MovimentoCaixa : EntityBase
    {
        public Guid AberturaCaixaId { get; set; }
        public AberturaCaixa AberturaCaixa { get; set; } = null!;
        public string Tipo { get; set; } = string.Empty; // "Suprimento" | "Sangria"
        public decimal Valor { get; set; }
        public DateTime DataMovimento { get; set; } = DateTime.UtcNow;
        public string? Observacao { get; set; }
    }
}
