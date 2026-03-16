namespace Communication.Responses.Caixa
{
    public class ResponseConferenciaCegaResultadoJSON
    {
        public decimal ValorEsperado { get; set; }
        public decimal ValorInformado { get; set; }
        public decimal Diferenca { get; set; }
        public bool Batido { get; set; }
    }
}
