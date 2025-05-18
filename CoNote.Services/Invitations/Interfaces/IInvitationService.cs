using CoNote.Services.Invitations.Models;

namespace CoNote.Services.Invitations.Interfaces;
public interface IInvitationService
{
    Task SendInvitationAsync(SendInvitationRequest request, CancellationToken cancellationToken);
}