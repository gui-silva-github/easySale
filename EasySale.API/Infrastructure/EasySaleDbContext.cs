using Microsoft.EntityFrameworkCore;
using EasySale.API.Entities.Clientes;
using EasySale.API.Entities.Produtos;
using EasySale.API.Entities.Caixas;
using EasySale.API.Entities.Vendas;

namespace EasySale.API.Infrastructure
{
    public class EasySaleDbContext : DbContext
    {
        public EasySaleDbContext (DbContextOptions<EasySaleDbContext> options) : base(options) { }

        public DbSet<Cliente> Clientes { get; set; } = default!;
        public DbSet<Produto> Produtos { get; set; } = default!;
        public DbSet<Caixa> Caixas { get; set; } = default!;
        public DbSet<AberturaCaixa> AberturasCaixa { get; set; } = default!;
        public DbSet<Venda> Vendas { get; set; } = default!;
        public DbSet<ItemVenda> ItensVenda { get; set; } = default!;
    }
}
