using AutoMapper;
using AutoMapper.QueryableExtensions;
using CoNote.Core.Entities;
using CoNote.Core.Exceptions;
using CoNote.Data.Repositories.Interfaces;
using CoNote.Infrastructure.Utilities.HttpContext.Interfaces;
using CoNote.Services.Users.Interfaces;
using CoNote.Services.Users.Models;
using Microsoft.EntityFrameworkCore;

namespace CoNote.Services.Users;
public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IHttpContextService _httpContextService;
    private readonly IMapper _mapper;

    public UserService(IUserRepository userRepository, IHttpContextService httpContextService, IMapper mapper)
    {
        _userRepository = userRepository;
        _httpContextService = httpContextService;
        _mapper = mapper;
    }

    public async Task<User> GetCurrentUserAsync(CancellationToken cancellationToken)
    {
        var currentUserId = _httpContextService.GetCurrentUserId();

        var user = await _userRepository.GetByIdAsync(currentUserId, cancellationToken);
        if (user == null)
        {
            throw new UserNotFoundException($"User with ID {currentUserId} not found.");
        }

        return user;
    }

    public async Task<List<SearchedUserView>> SearchUsersByUsernameAsync(string searchValue, int? limit, CancellationToken cancellationToken)
    {
        var searchedUsersQueryable = _userRepository.SearchByUsername(searchValue)
            .ProjectTo<SearchedUserView>(_mapper.ConfigurationProvider);

        if (limit.HasValue)
        {
            searchedUsersQueryable = searchedUsersQueryable.Take(limit.Value);
        }

        return await searchedUsersQueryable.ToListAsync(cancellationToken);
    }
}
