using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CoNote.Core.Exceptions;
using CoNote.Infrastructure.Utilities.Token.Interfaces;
using CoNote.Infrastructure.Utilities.Token.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace CoNote.Infrastructure.Utilities.Token;
public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration;

    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public Task<GenerateTokenResponseModel> GenerateTokenAsync(GenerateTokenRequestModel request, CancellationToken cancellationToken)
    {
        var TokenExpireDate = DateTime.UtcNow.AddHours(6);

        var secret = _configuration["JWT:Secret"];
        if (secret == null)
        {
            throw new SecretKeyIsNotConfiguredException();
        }

        SymmetricSecurityKey symmetricSecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret));
        List<Claim> claims = new List<Claim>()
        {
            new Claim(ClaimTypes.NameIdentifier, request.UserId),
            new Claim("TokenExpireDate", TokenExpireDate.ToString())
        };

        JwtSecurityToken jwt = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: TokenExpireDate,
                signingCredentials: new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256)
            );

        return Task.FromResult(new GenerateTokenResponseModel
        {
            AccessToken = new JwtSecurityTokenHandler().WriteToken(jwt),
            AccessTokenExpireDate = TokenExpireDate
        });
    }
}
