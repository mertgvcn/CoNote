using CoNote.Services.Workspaces.Models;

namespace CoNote.Services.Workspaces.Interfaces;
public interface IWorkspaceService
{
    Task<List<WorkspaceView>> GetCurrentUserWorkspacesAsync(CancellationToken cancellationToken);
    Task<List<StructureView>> GetStructureByWorkspaceAndSectionIdAsync(long workspaceId, long? sectionId, CancellationToken cancellationToken);
    Task<List<MemberView>> GetMembersByWorkspaceIdAsync(long workspaceId, CancellationToken cancellationToken);
    Task<List<InvitationView>> GetInvitationsByWorkspaceIdAsync(long workspaceId, CancellationToken cancellationToken);
    Task<SettingsView> GetSettingsByWorkspaceIdAsync(long workspaceId, CancellationToken cancellationToken);
    Task CreateWorkspaceAsync(CreateWorkspaceRequest request, CancellationToken cancellationToken);
}