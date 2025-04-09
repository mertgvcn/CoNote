namespace CoNote.Infrastructure.Utilities.Token.Models;
public class GenerateTokenResponseModel
{
    public required string Token { get; set; }
    public required DateTime TokenExpireDate { get; set; }
}
