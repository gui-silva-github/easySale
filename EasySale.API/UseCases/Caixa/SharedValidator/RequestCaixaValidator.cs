using Communication.Requests.Caixa;
using FluentValidation;

namespace EasySale.API.UseCases.Caixa.SharedValidator
{
    public class RequestCaixaValidator : AbstractValidator<RequestCaixaJSON>
    {
        public RequestCaixaValidator()
        {
            RuleFor(caixa => caixa.Descricao).NotEmpty().WithMessage("Descrição do caixa inválida");
        }
    }
}
