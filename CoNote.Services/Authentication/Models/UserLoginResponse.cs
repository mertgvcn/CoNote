namespace CoNote.Services.Authentication.Models;
public record UserLoginResponse
{
    public string AccessToken { get; init; } = default!;
    public DateTime AccessTokenExpireDate { get; init; }
}
