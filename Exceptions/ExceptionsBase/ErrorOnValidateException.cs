using System.Net;

namespace Exceptions.ExceptionsBase
{
    public class ErrorOnValidateException : EasySaleExceptions
    {
        private readonly List<string> _errors;

        public ErrorOnValidateException(List<string> errorMessages) : base(string.Empty)
        {
            _errors = errorMessages;
        }

        public override List<string> GetErrors() => _errors;

        public override HttpStatusCode GetHttpStatusCode() => HttpStatusCode.BadRequest;
    }
}
