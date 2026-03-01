namespace Communication.Responses.Caixa
{
    public class ResponseAberturaCaixaJSON
    {
        public Guid Id { get; set; }
        public Guid CaixaId { get; set; }
        public DateTime DataAbertura { get; set; }
        public decimal ValorInicial { get; set; }
        public bool EstaAberto { get; set; } = false;
    }
}
