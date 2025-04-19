using CoNote.Services.Authentication.Models;

namespace CoNote.Services.Authentication.Interfaces;
public interface IAuthenticationService
{
    Task<UserLoginResponse> LoginUserAsync(UserLoginRequest request, CancellationToken cancellationToken);
    Task RegisterUserAsync(UserRegisterRequest request, CancellationToken cancellationToken);
    Task ValidateTokenAsync(string token, CancellationToken cancellationToken);
}