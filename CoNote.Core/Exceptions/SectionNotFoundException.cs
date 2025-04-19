namespace CoNote.Core.Exceptions;
public class SectionNotFoundException : BaseException
{
    public SectionNotFoundException(string message = "Section not found.") : base(message, 404)
    {
    }
}
