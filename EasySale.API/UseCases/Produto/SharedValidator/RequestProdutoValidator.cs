using FluentValidation;
using Communication.Requests.Produto;

namespace EasySale.API.UseCases.Produto.SharedValidator
{
    public class RequestProdutoValidator : AbstractValidator<RequestProdutoJSON>  
    {
        public RequestProdutoValidator()
        {
            RuleFor(product => product.Nome).NotEmpty().WithMessage("Nome do produto inválido");
            RuleFor(product => product.Marca).NotEmpty().WithMessage("Marca do produto inválida");
            RuleFor(product => product.Preco).GreaterThan(0).WithMessage("Preço inválido, deve ser maior do que 0.");
        }
    }
}
