using System.Net;

namespace Exceptions.ExceptionsBase
{
    public class NotFoundException(string errorMessage) : EasySaleExceptions(errorMessage)
    {
        public override List<string> GetErrors() => [Message];

        public override HttpStatusCode GetHttpStatusCode() => HttpStatusCode.NotFound;
    }
}
