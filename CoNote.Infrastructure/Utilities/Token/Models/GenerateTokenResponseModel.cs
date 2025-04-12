﻿namespace CoNote.Infrastructure.Utilities.Token.Models;
public record GenerateTokenResponseModel
{
    public required string AccessToken { get; init; }
    public required DateTime AccessTokenExpireDate { get; init; }
}
