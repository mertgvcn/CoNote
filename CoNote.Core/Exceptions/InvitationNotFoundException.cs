namespace CoNote.Core.Exceptions;
public class InvitationNotFoundException : BaseException
{
    public InvitationNotFoundException(string message = "Invitation not found.") : base(message, 404)
    {
    }
}
