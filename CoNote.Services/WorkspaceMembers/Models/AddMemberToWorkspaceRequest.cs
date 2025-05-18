namespace CoNote.Services.WorkspaceMembers.Models;
public class AddMemberToWorkspaceRequest
{
    public long UserId { get; set; }
    public long WorkspaceId { get; set; }
    public long RoleId { get; set; }
}
