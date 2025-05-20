using CoNote.Core.Enums;

namespace CoNote.Services.Invitations.Models;
public class UpdateInvitationStatusRequest
{
    public long InvitationId { get; set; }
    public InvitationStatus Status { get; set; }
}
