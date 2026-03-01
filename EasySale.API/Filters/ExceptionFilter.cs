using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Exceptions.ExceptionsBase;
using Communication.Responses.Error;


namespace EasySale.API.Filters
{
    public class ExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            if (context.Exception is EasySaleExceptions easySaleExceptions)
            {
                context.HttpContext.Response.StatusCode = (int)easySaleExceptions.GetHttpStatusCode();
                context.Result = new ObjectResult(new ResponseErrorMessagesJSON(easySaleExceptions.GetErrors()));
            }
            else
            {
                ThrowUnknownError(context);
            }
        }


        private void ThrowUnknownError(ExceptionContext context)
        {
            context.HttpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
            context.Result = new ObjectResult(new ResponseErrorMessagesJSON("ERRO DESCONHECIDO"));
        }
    }
}
