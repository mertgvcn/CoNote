namespace CoNote.Core.Exceptions;
public class NotificationNotFoundException : BaseException
{
    public NotificationNotFoundException(string message = "Notification not found.") : base(message, 404)
    {
    }
}
