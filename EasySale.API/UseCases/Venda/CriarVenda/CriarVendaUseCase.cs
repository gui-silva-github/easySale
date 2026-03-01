using Communication.Responses.Venda;
using EasySale.API.Infrastructure;
using Exceptions.ExceptionsBase;

namespace EasySale.API.UseCases.Venda.CriarVenda
{
    public class CriarVendaUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public CriarVendaUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ResponseVendaJSON Execute(Guid aberturaId)
        {
            var abertura = _dbContext.AberturasCaixa.FirstOrDefault(a => a.Id == aberturaId);
            if (abertura == null)
                throw new NotFoundException("Abertura não encontrada.");

            if (!abertura.EstaAberto)
                throw new ErrorOnValidateException(new List<string> { "Abertura não está ativa." });

            var doisMinutosAtras = DateTime.UtcNow.AddMinutes(-2);
            var vendaExistente = _dbContext.Vendas
                .Where(v => v.AberturaCaixaId == aberturaId && v.ValorTotal == 0)
                .Where(v => v.DataVenda >= doisMinutosAtras)
                .OrderByDescending(v => v.DataVenda)
                .FirstOrDefault();

            if (vendaExistente != null)
            {
                var itens = _dbContext.ItensVenda
                    .Where(i => i.VendaId == vendaExistente.Id)
                    .Select(i => new ResponseItemVendaJSON
                    {
                        Id = i.VendaId,
                        ProdutoId = i.ProdutoId,
                        ProdutoNome = i.Produto.Nome,
                        Quantidade = i.Quantidade,
                        PrecoUnitario = i.PrecoUnitario,
                        Subtotal = i.Subtotal
                    })
                    .ToList();

                return new ResponseVendaJSON
                {
                    Id = vendaExistente.Id,
                    AberturaCaixaId = vendaExistente.AberturaCaixaId,
                    DataVenda = vendaExistente.DataVenda,
                    ValorTotal = vendaExistente.ValorTotal,
                    Itens = itens
                };
            }

            var venda = new Entities.Vendas.Venda
            {
                AberturaCaixaId = aberturaId,
                DataVenda = DateTime.UtcNow,
                ValorTotal = 0
            };

            _dbContext.Vendas.Add(venda);
            _dbContext.SaveChanges();

            return new ResponseVendaJSON
            {
                Id = venda.Id,
                AberturaCaixaId = venda.AberturaCaixaId,
                DataVenda = venda.DataVenda,
                ValorTotal = venda.ValorTotal,
                Itens = []
            };
        }
    }
}
