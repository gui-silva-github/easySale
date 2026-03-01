using Communication.Requests.Venda;
using FluentValidation;

namespace EasySale.API.UseCases.Venda.SharedValidator
{
    public class RequestAdicionarItemVendaValidator : AbstractValidator<RequestAdicionarItemVendaJSON>
    {
        public RequestAdicionarItemVendaValidator()
        {
            RuleFor(item => item.ProdutoId).NotEmpty().WithMessage("ID do produto é obrigatório");
            RuleFor(item => item.Quantidade).GreaterThan(0).WithMessage("Quantidade deve ser maior que 0");
            RuleFor(item => item.PrecoUnitario).GreaterThan(0).When(item => item.PrecoUnitario.HasValue).WithMessage("Preço unitário deve ser maior que 0");
        }
    }
}
