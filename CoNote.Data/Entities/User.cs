using CoNote.Core.Entities.Common;

namespace CoNote.Core.Entities;
public sealed class User : BaseEntity, IEditable, ISoftDeletable
{
    public string EditedBy { get; set; } = default!;
    public DateTime EditedAt { get; set; } = DateTime.Now;
    public bool IsDeleted { get; set; }
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string Username { get; set; } = default!;
    public string Password { get; set; } = default!;
    public List<WorkspaceMember> WorkspaceMemberships { get; set; } = default!;
    public List<Comment> Comments { get; set; } = default!;
    public List<Notification> Notifications { get; set; } = default!;
    public List<User> Followings { get; set; } = default!;
    public List<User> Followers { get; set; } = default!;
    public List<User> BlockedUsers { get; set; } = default!;
    public List<User> BlockedByUsers { get; set; } = default!;
    public List<Invitation> SentInvitations { get; set; } = default!;
    public List<Invitation> ReceivedInvitations { get; set; } = default!;
}
