namespace CoNote.Services.Authentication.Models;
public record UserLoginRequest
{
    public string Email { get; init; } = default!;
    public string Password { get; init; } = default!;
}
