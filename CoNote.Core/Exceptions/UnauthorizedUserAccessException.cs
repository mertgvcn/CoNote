namespace CoNote.Core.Exceptions;
public class UnauthorizedUserAccessException : BaseException
{
    public UnauthorizedUserAccessException(string message = "Unauthorized access.") : base(message, 403)
    {

    }
}
