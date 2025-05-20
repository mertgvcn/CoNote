using CoNote.Services.WorkspaceMembers.Models;

namespace CoNote.Services.WorkspaceMembers.Interfaces;
public interface IWorkspaceMemberService
{
    Task AddMemberToWorkspaceAsync(AddMemberToWorkspaceRequest request, CancellationToken cancellationToken);
}