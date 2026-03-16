namespace EasySale.API.Entities.Vendas
{
    public class FormaPagamento : EntityBase
    {
        public string Descricao { get; set; } = string.Empty;
        public bool PermiteTroco { get; set; }
    }
}
