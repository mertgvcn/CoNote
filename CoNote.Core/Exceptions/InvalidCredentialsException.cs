namespace CoNote.Core.Exceptions;
public class InvalidCredentialsException : BaseException
{
    public InvalidCredentialsException(string message = "Username or password is wrong.") : base(message, 400)
    {
    }
}
