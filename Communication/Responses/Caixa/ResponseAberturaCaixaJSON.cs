namespace Communication.Responses.Caixa
{
    public class ResponseAberturaCaixaJSON
    {
        public Guid Id { get; set; }
        public Guid CaixaId { get; set; }
        public string CaixaDescricao { get; set; } = string.Empty;
        public DateTime DataAbertura { get; set; }
        public DateTime? DataFechamento { get; set; }
        public decimal ValorInicial { get; set; }
        public decimal? ValorFinal { get; set; }
        public bool EstaAberto { get; set; }
        public decimal TotalVendas { get; set; }
        public decimal TotalSuprimentos { get; set; }
        public decimal TotalSangrias { get; set; }
        public decimal SaldoEsperado { get; set; }
    }
}
