namespace CoNote.Core.Exceptions;
public class InvalidTokenException : BaseException
{
    public InvalidTokenException(string message = "Invalid token.") : base(message, 401)
    {
    }
}
