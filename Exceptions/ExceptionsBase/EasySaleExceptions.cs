using System.Net;

namespace Exceptions.ExceptionsBase
{
    public abstract class EasySaleExceptions : System.Exception
    {
        public EasySaleExceptions(string errorMessage) : base(errorMessage)
        { }

        public abstract List<string> GetErrors();

        public abstract HttpStatusCode GetHttpStatusCode();
    }
}
