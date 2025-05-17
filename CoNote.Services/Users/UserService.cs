using AutoMapper;
using AutoMapper.QueryableExtensions;
using CoNote.Data.Repositories.Interfaces;
using CoNote.Services.Users.Interfaces;
using CoNote.Services.Users.Models;
using Microsoft.EntityFrameworkCore;

namespace CoNote.Services.Users;
public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public UserService(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
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
