using AutoMapper;
using CoNote.Core.Constants;
using CoNote.Core.Entities;
using CoNote.Core.Enums;
using CoNote.Core.Exceptions;
using CoNote.Data.Repositories.Interfaces;
using CoNote.Services.Roles.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CoNote.Services.Roles;
public class RoleService : IRoleService
{
    private readonly IRoleRepository _roleRepository;
    private readonly IPermissionRepository _permissionRepository;
    private readonly IMapper _mapper;

    public RoleService(IRoleRepository roleRepository, IPermissionRepository permissionRepository, IMapper mapper)
    {
        _roleRepository = roleRepository;
        _permissionRepository = permissionRepository;
        _mapper = mapper;
    }

    public async Task<List<Role>> CreateDefaultRolesForWorkspaceAsync(Workspace workspace, User createdByUser, CancellationToken cancellationToken)
    {
        var permissions = await _permissionRepository.GetAll().ToListAsync(cancellationToken);
        if (permissions == null || !permissions.Any())
        {
            throw new PermissionNotFoundException("No permissions found to create roles.");
        }

        var roles = DefaultRoleNames.All.Select(name =>
        {
            var rolePermissions = DefaultRolePermissions.RolePermissionMap.TryGetValue(name, out var permissionDefinitions)
                ? permissionDefinitions
                : new List<(PermissionAction, PermissionObjectType)>();

            var role = new Role
            {
                Workspace = workspace,
                Name = name,
                CreatedBy = createdByUser.Username,
                EditedBy = createdByUser.Username,
                Permissions = permissions
                                .Where(p => rolePermissions.Any(rp => rp.Item1 == p.Action && rp.Item2 == p.ObjectType))
                                .ToList()
            };

            return role;
        }).ToList();

        await _roleRepository.AddRangeAsync(roles, cancellationToken);
        return roles;
    }
}
