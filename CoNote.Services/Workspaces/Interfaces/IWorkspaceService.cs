using CoNote.Services.Workspaces.Models;

namespace CoNote.Services.Workspaces.Interfaces;
public interface IWorkspaceService
{
    Task<List<WorkspaceView>> GetCurrentUserWorkspacesAsync(CancellationToken cancellationToken);
    Task CreateWorkspaceAsync(CreateWorkspaceRequest request, CancellationToken cancellationToken);
}