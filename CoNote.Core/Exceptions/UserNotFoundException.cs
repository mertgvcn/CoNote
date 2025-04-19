namespace CoNote.Core.Exceptions;
public class UserNotFoundException : BaseException
{
    public UserNotFoundException(string message = "User not found.") : base(message, 404)
    {
    }
}
