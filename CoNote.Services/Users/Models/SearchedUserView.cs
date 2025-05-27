namespace CoNote.Services.Users.Models;
public record SearchedUserView
{
    public long Id { get; set; }
    public string FullName { get; set; } = default!;
    public string Username { get; set; } = default!;
}
