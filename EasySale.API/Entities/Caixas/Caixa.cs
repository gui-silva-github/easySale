namespace EasySale.API.Entities.Caixas
{
    public class Caixa : EntityBase
    {
        public string Descricao { get; set; } = string.Empty;
        public string Status { get; set; } = "Disponível";
        public List<AberturaCaixa> Aberturas { get; set; } = [];
    }
}
