using CoNote.Core.Enums;

namespace CoNote.Services.Workspaces.Models;
public record WorkspaceInvitationView
{
    public long Id { get; set; }
    public long SenderId { get; set; }
    public string SenderFullName { get; set; } = default!;
    public string SenderEmail { get; set; } = default!;
    public string SenderUsername { get; set; } = default!;
    public long? ReceiverId { get; set; }
    public string? ReceiverFullName { get; set; }
    public string? ReceiverEmail { get; set; }
    public string? ReceiverUsername { get; set; }
    public long RoleId { get; set; }
    public string RoleName { get; set; } = default!;
    public InvitationType Type { get; set; }
    public InvitationStatus Status { get; set; }
}
