namespace CoNote.Core.Exceptions;
public class UserAlreadyExistsException : BaseException
{
    public UserAlreadyExistsException(string message = "User already exists.") : base(message, 400)
    {
    }
}
