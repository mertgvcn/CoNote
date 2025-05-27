namespace CoNote.Core.Exceptions;
public class WorkspaceNotFoundException : BaseException
{
    public WorkspaceNotFoundException(string message = "Workspace not found.") : base(message, 404)
    {
    }
}
