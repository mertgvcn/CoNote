namespace CoNote.Core.Exceptions;
public class ComponentNotFoundException : BaseException
{
    public ComponentNotFoundException(string message = "Component not found.") : base(message, 404)
    {
    }
}
