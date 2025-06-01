namespace CoNote.Core.Exceptions;
public class PermissionNotFoundException : BaseException
{
    public PermissionNotFoundException(string message = "Permission not found.") : base(message, 404)
    {
    }
}
