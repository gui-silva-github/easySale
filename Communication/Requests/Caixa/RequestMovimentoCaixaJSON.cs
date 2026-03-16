namespace Communication.Requests.Caixa
{
    public class RequestMovimentoCaixaJSON
    {
        public string Tipo { get; set; } = string.Empty; // "Suprimento" | "Sangria"
        public decimal Valor { get; set; }
        public string? Observacao { get; set; }
    }
}
