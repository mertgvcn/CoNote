namespace CoNote.Infrastructure.Utilities.Token.Models;
public record GenerateTokenRequestModel
{
    public required string UserId { get; init; }
}
