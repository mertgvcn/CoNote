namespace CoNote.Services.Invitations.Models;
public record SendInvitationRequest
{
    public long WorkspaceId { get; init; }
    public long ReceiverId { get; init; }
    public long RoleId { get; init; }
}
