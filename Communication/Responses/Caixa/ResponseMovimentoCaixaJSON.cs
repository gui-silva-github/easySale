namespace Communication.Responses.Caixa
{
    public class ResponseMovimentoCaixaJSON
    {
        public Guid Id { get; set; }
        public string Tipo { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public DateTime DataMovimento { get; set; }
        public string? Observacao { get; set; }
    }
}
