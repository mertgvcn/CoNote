namespace CoNote.Core.Exceptions;
public class RoleNotFoundException : BaseException
{
    public RoleNotFoundException(string message = "Role not found.") : base(message, 404)
    {
    }
}
