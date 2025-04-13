using AutoMapper;
using CoNote.Core.Entities;
using CoNote.Core.Exceptions;
using CoNote.Data.Repositories.Interfaces;
using CoNote.Infrastructure.Utilities.Token.Interfaces;
using CoNote.Infrastructure.Utilities.Token.Models;
using CoNote.Infrastructure.Utilities.Transaction.Interfaces;
using CoNote.Services.Authentication.Interfaces;
using CoNote.Services.Authentication.Models;

namespace CoNote.Services.Authentication;
public class AuthenticationService : IAuthenticationService
{
    private readonly IUserRepository _userRepository;
    private readonly ITransactionService _transactionService;
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;

    public AuthenticationService(
        IUserRepository userRepository,
        ITransactionService transactionService,
        ITokenService tokenService,
        IMapper mapper)
    {
        _userRepository = userRepository;
        _transactionService = transactionService;
        _tokenService = tokenService;
        _mapper = mapper;
    }

    public async Task<UserLoginResponse> LoginUserAsync(UserLoginRequest request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetUserByEmailAsync(request.Email, cancellationToken);

        if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            throw new InvalidCredentialsException();

        var generateTokenRequest = new GenerateTokenRequestModel()
        {
            UserId = user.Id.ToString(),
        };
        var generatedToken = await _tokenService.GenerateTokenAsync(generateTokenRequest, cancellationToken);

        return new UserLoginResponse()
        {
            AccessToken = generatedToken.AccessToken,
            AccessTokenExpireDate = generatedToken.AccessTokenExpireDate,
        };
    }

    public async Task RegisterUserAsync(UserRegisterRequest request, CancellationToken cancellationToken)
    {
        using var transaction = await _transactionService.CreateTransactionAsync(cancellationToken);

        var existingEmail = await _userRepository.UserExistsByEmailAsync(request.Email, cancellationToken);
        if (existingEmail == true)
            throw new UserAlreadyExistsException("This email is already exists");

        var existingUsername = await _userRepository.UserExistsByUsernameAsync(request.Username, cancellationToken);
        if (existingUsername == true)
            throw new UserAlreadyExistsException("This username is already exists");

        string hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);

        var newUser = _mapper.Map<User>(request);
        newUser.Password = hashedPassword;
        newUser.CreatedBy = request.Username;
        newUser.EditedBy = newUser.Username;

        await _userRepository.AddAsync(newUser, cancellationToken);

        await transaction.CommitAsync(cancellationToken);
    }
}
