namespace Communication.Responses.Venda
{
    public class ResponseFormaPagamentoJSON
    {
        public Guid Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public bool PermiteTroco { get; set; }
    }
}
