using FluentValidation;
using Communication.Requests.Cliente;

namespace EasySale.API.UseCases.Cliente.SharedValidator
{
    public class RequestClienteValidator : AbstractValidator<RequestClienteJSON>
    {
        public RequestClienteValidator()
        {
            RuleFor(client => client.Nome).NotEmpty().WithMessage("O nome não pode ser vazio.");
            RuleFor(client => client.Email).EmailAddress().WithMessage("O email não é válido.");
        }
    }
}
