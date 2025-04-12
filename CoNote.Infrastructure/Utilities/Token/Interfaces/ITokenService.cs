using CoNote.Infrastructure.Utilities.Token.Models;

namespace CoNote.Infrastructure.Utilities.Token.Interfaces;
public interface ITokenService
{
    Task<GenerateTokenResponseModel> GenerateTokenAsync(GenerateTokenRequestModel request, CancellationToken cancellationToken);
}