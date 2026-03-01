using Communication.Requests.Caixa;
using FluentValidation;

namespace EasySale.API.UseCases.Caixa.SharedValidator
{
    public class RequestAbrirCaixaValidator : AbstractValidator<RequestAbrirCaixaJSON>
    {
        public RequestAbrirCaixaValidator()
        {
            RuleFor(request => request.ValorInicial).GreaterThanOrEqualTo(0).WithMessage("Valor inicial deve ser maior ou igual a 0");
        }
    }
}
