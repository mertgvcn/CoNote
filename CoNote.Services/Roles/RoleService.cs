using AutoMapper;
using CoNote.Core.Constants;
using CoNote.Core.Entities;
using CoNote.Data.Repositories.Interfaces;
using CoNote.Services.Roles.Interfaces;

namespace CoNote.Services.Roles;
public class RoleService : IRoleService
{
    private readonly IRoleRepository _roleRepository;
    private readonly IMapper _mapper;

    public RoleService(IRoleRepository roleRepository, IMapper mapper)
    {
        _roleRepository = roleRepository;
        _mapper = mapper;
    }

    public async Task<List<Role>> CreateDefaultRolesForWorkspaceAsync(Workspace workspace, User createdByUser, CancellationToken cancellationToken)
    {
        var roles = DefaultRoleNames.All.Select(name => new Role
        {
            Workspace = workspace,
            Name = name,
            CreatedBy = createdByUser.Username,
            EditedBy = createdByUser.Username
        }).ToList();

        await _roleRepository.AddRangeAsync(roles, cancellationToken);
        return roles;
    }
}
