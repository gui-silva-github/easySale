using Communication.Requests.Venda;
using Communication.Responses.Venda;
using EasySale.API.Infrastructure;
using EasySale.API.UseCases.Venda.SharedValidator;
using Exceptions.ExceptionsBase;

namespace EasySale.API.UseCases.Venda.AdicionarItem
{
    public class AdicionarItemVendaUseCase
    {
        private readonly EasySaleDbContext _dbContext;

        public AdicionarItemVendaUseCase(EasySaleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ResponseVendaJSON Execute(Guid vendaId, RequestAdicionarItemVendaJSON request)
        {
            Validate(request);

            var venda = _dbContext.Vendas.FirstOrDefault(v => v.Id == vendaId);
            if (venda == null)
                throw new NotFoundException("Venda não encontrada.");

            var abertura = _dbContext.AberturasCaixa.FirstOrDefault(a => a.Id == venda.AberturaCaixaId);
            if (abertura == null || !abertura.EstaAberto)
                throw new ErrorOnValidateException(new List<string> { "Abertura não está ativa." });

            var produto = _dbContext.Produtos.FirstOrDefault(p => p.Id == request.ProdutoId);
            if (produto == null)
                throw new NotFoundException("Produto não encontrado.");

            var precoUnitario = request.PrecoUnitario ?? produto.Preco;
            var subtotal = precoUnitario * request.Quantidade;

            var itemExistente = _dbContext.ItensVenda
                .FirstOrDefault(i => i.VendaId == vendaId && i.ProdutoId == request.ProdutoId);

            if (itemExistente != null)
            {
                itemExistente.Quantidade += request.Quantidade;
                itemExistente.Subtotal = itemExistente.PrecoUnitario * itemExistente.Quantidade;
            }
            else
            {
                var item = new Entities.Vendas.ItemVenda
                {
                    VendaId = vendaId,
                    ProdutoId = request.ProdutoId,
                    Quantidade = request.Quantidade,
                    PrecoUnitario = precoUnitario,
                    Subtotal = subtotal
                };

                _dbContext.ItensVenda.Add(item);
            }

            venda.ValorTotal = _dbContext.ItensVenda
                .Where(i => i.VendaId == vendaId)
                .Sum(i => i.Subtotal);

            _dbContext.SaveChanges();

            var itens = _dbContext.ItensVenda
                .Where(i => i.VendaId == vendaId)
                .Select(i => new ResponseItemVendaJSON
                {
                    Id = i.Id,
                    ProdutoId = i.ProdutoId,
                    ProdutoNome = i.Produto.Nome,
                    Quantidade = i.Quantidade,
                    PrecoUnitario = i.PrecoUnitario,
                    Subtotal = i.Subtotal
                })
                .ToList();
    
            return new ResponseVendaJSON
            {
                Id = venda.Id,
                AberturaCaixaId = venda.AberturaCaixaId,
                DataVenda = venda.DataVenda,
                ValorTotal = venda.ValorTotal,
                Itens = itens
            };
        }

        private static void Validate(RequestAdicionarItemVendaJSON request)
        {
            var validator = new RequestAdicionarItemVendaValidator();
            var result = validator.Validate(request);

            if (result.IsValid == false)
            {
                var errors = result.Errors.Select(failure => failure.ErrorMessage).ToList();
                throw new ErrorOnValidateException(errors);
            }
        }
    }
}
