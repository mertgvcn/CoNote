using CoNote.Services.Workspaces.Models;

namespace CoNote.Services.Workspaces.Interfaces;
public interface IWorkspaceService
{
    Task CreateWorkspaceAsync(CreateWorkspaceRequest request, CancellationToken cancellationToken);
}