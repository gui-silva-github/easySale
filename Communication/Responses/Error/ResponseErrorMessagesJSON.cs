namespace Communication.Responses.Error
{
    public class ResponseErrorMessagesJSON
    {
        public List<string> Errors { get; private set; }
        public ResponseErrorMessagesJSON(string message) {
            Errors = [message];
        }
        public ResponseErrorMessagesJSON(List<string> messages)
        {
            Errors = messages;
        }
    }
}
