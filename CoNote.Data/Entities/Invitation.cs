using CoNote.Core.Entities.Common;
using CoNote.Core.Enums;

namespace CoNote.Core.Entities;
public class Invitation : BaseEntity
{
    public long WorkspaceId { get; set; }
    public Workspace Workspace { get; set; } = default!;
    public long SenderId { get; set; }
    public User Sender { get; set; } = default!;
    public long? ReceiverId { get; set; }
    public User? Receiver { get; set; } = default!;
    public long RoleId { get; set; }
    public Role Role { get; set; } = default!;
    public InvitationType Type { get; set; } = InvitationType.InviteSent;
    public InvitationStatus Status { get; set; } = InvitationStatus.Pending;
}
