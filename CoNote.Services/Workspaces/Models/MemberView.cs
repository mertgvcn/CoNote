namespace CoNote.Services.Workspaces.Models;
public class MemberView
{
    public long Id { get; init; }
    public long UserId { get; set; }
    public string FullName { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string Username { get; set; } = default!;
    public long RoleId { get; set; }
    public string RoleName { get; set; } = default!;
}
