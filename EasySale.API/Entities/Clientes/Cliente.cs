using EasySale.API.Entities.Produtos;

namespace EasySale.API.Entities.Clientes
{
    public class Cliente : EntityBase
    {
        public string Nome {  get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public List<Produto> Produtos { get; set; } = [];
    }
}
