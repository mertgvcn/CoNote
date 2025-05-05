namespace CoNote.Core.Exceptions;
public class WorksheetNotFoundException : BaseException
{
    public WorksheetNotFoundException(string message = "Worksheet not found.") : base(message, 404)
    {
    }
}
