using CoNote.Services.Invitations.Models;

namespace CoNote.Services.Invitations.Interfaces;
public interface IInvitationService
{
    Task SendInvitationAsync(SendInvitationRequest request, CancellationToken cancellationToken);
    Task<long> DeleteInvitationAsync(long invitationId, CancellationToken cancellationToken);
    Task<List<InvitationView>> GetCurrentUserInvitationsAsync(CancellationToken cancellationToken);
    Task UpdateInvitationStatusAsync(UpdateInvitationStatusRequest request, CancellationToken cancellationToken);
}