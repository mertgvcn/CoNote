using AutoMapper;
using AutoMapper.QueryableExtensions;
using CoNote.Core.Constants;
using CoNote.Core.Entities;
using CoNote.Core.Enums;
using CoNote.Core.Exceptions;
using CoNote.Data.Repositories.Interfaces;
using CoNote.Infrastructure.Utilities.Transaction.Interfaces;
using CoNote.Services.Permissions.Interfaces;
using CoNote.Services.Roles.Interfaces;
using CoNote.Services.Users.Interfaces;
using CoNote.Services.Workspaces.Interfaces;
using CoNote.Services.Workspaces.Models;
using Microsoft.EntityFrameworkCore;

namespace CoNote.Services.Workspaces;
public class WorkspaceService : IWorkspaceService
{
    private readonly IWorkspaceRepository _workspaceRepository;
    private readonly IWorkspaceMemberRepository _workspaceMemberRepository;
    private readonly IInvitationRepository _invitationRepository;
    private readonly ISectionRepository _sectionRepository;
    private readonly IWorksheetRepository _worksheetRepository;
    private readonly IRoleRepository _roleRepository;
    private readonly IUserService _userService;
    private readonly IRoleService _roleService;
    private readonly IPermissionService _permissionService;
    private readonly ITransactionService _transactionService;
    private readonly IMapper _mapper;

    public WorkspaceService(
        IWorkspaceRepository workspaceRepository,
        IWorkspaceMemberRepository workspaceMemberRepository,
        IInvitationRepository invitationRepository,
        ISectionRepository sectionRepository,
        IWorksheetRepository worksheetRepository,
        IRoleRepository roleRepository,
        IUserService userService,
        IRoleService roleService,
        IPermissionService permissionService,
        ITransactionService transactionService,
        IMapper mapper)
    {
        _workspaceRepository = workspaceRepository;
        _workspaceMemberRepository = workspaceMemberRepository;
        _invitationRepository = invitationRepository;
        _sectionRepository = sectionRepository;
        _worksheetRepository = worksheetRepository;
        _roleRepository = roleRepository;
        _userService = userService;
        _roleService = roleService;
        _permissionService = permissionService;
        _transactionService = transactionService;
        _mapper = mapper;
    }

    public async Task<List<WorkspaceView>> GetCurrentUserWorkspacesAsync(CancellationToken cancellationToken)
    {
        var currentUser = await _userService.GetCurrentUserAsync(cancellationToken);

        var workspaceViews = await _workspaceMemberRepository
           .GetWorkspacesByUserId(currentUser.Id)
           .ProjectTo<WorkspaceView>(_mapper.ConfigurationProvider)
           .ToListAsync(cancellationToken);

        return workspaceViews;
    }

    public async Task<List<StructureView>> GetStructureByWorkspaceAndSectionIdAsync(long workspaceId, long? sectionId, CancellationToken cancellationToken)
    {
        var hasPermission = await _permissionService.HasCurrentUserSpecificPermissionOnWorkspaceAsync(
            workspaceId,
            PermissionAction.View,
            PermissionObjectType.Structure,
            cancellationToken);

        if (!hasPermission)
        {
            throw new UnauthorizedUserAccessException();
        }

        var sections = await _sectionRepository.GetListByWorkspaceAndParentId(workspaceId, sectionId)
            .ToListAsync(cancellationToken);
        var sectionViews = _mapper.Map<List<StructureView>>(sections);

        var worksheets = await _worksheetRepository.GetListByWorkspaceAndSectionId(workspaceId, sectionId)
            .ToListAsync(cancellationToken);
        var worksheetViews = _mapper.Map<List<StructureView>>(worksheets);

        var structureList = new List<StructureView>();
        structureList.AddRange(sectionViews);
        structureList.AddRange(worksheetViews);

        return structureList;
    }

    public async Task<List<MemberView>> GetMembersByWorkspaceIdAsync(long workspaceId, CancellationToken cancellationToken)
    {
        var hasPermission = await _permissionService.HasCurrentUserSpecificPermissionOnWorkspaceAsync(
            workspaceId,
            PermissionAction.View,
            PermissionObjectType.Members,
            cancellationToken);

        if (!hasPermission)
        {
            throw new UnauthorizedUserAccessException();
        }

        var memberViews = await _workspaceMemberRepository.GetListByWorkspaceId(workspaceId)
            .ProjectTo<MemberView>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        return memberViews;
    }

    public async Task<List<WorkspaceInvitationView>> GetInvitationsByWorkspaceIdAsync(long workspaceId, CancellationToken cancellationToken)
    {
        var hasPermission = await _permissionService.HasCurrentUserSpecificPermissionOnWorkspaceAsync(
            workspaceId,
            PermissionAction.View,
            PermissionObjectType.Invitations,
            cancellationToken);

        if (!hasPermission)
        {
            throw new UnauthorizedUserAccessException();
        }

        var invitationViews = await _invitationRepository.GetListByWorkspaceId(workspaceId)
            .ProjectTo<WorkspaceInvitationView>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        return invitationViews;
    }

    public async Task<WorkspaceSettingsView> GetSettingsByWorkspaceIdAsync(long workspaceId, CancellationToken cancellationToken)
    {
        var hasPermission = await _permissionService.HasCurrentUserSpecificPermissionOnWorkspaceAsync(
            workspaceId,
            PermissionAction.View,
            PermissionObjectType.Settings,
            cancellationToken);

        if (!hasPermission)
        {
            throw new UnauthorizedUserAccessException();
        }

        var settingsView = await _workspaceRepository.GetById(workspaceId)
            .ProjectTo<WorkspaceSettingsView>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync(cancellationToken);

        if (settingsView == null)
        {
            throw new WorkspaceNotFoundException();
        }

        return settingsView;
    }

    public async Task<List<RoleView>> GetRolesByWorkspaceIdAsync(long workspaceId, CancellationToken cancellationToken)
    {
        var roleViews = await _roleRepository.GetRolesByWorkspaceId(workspaceId)
            .ProjectTo<RoleView>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        return roleViews;
    }

    public async Task CreateWorkspaceAsync(CreateWorkspaceRequest request, CancellationToken cancellationToken)
    {
        var currentUser = await _userService.GetCurrentUserAsync(cancellationToken);

        using var transaction = await _transactionService.CreateTransactionAsync(cancellationToken);

        var workspace = _mapper.Map<Workspace>(request);
        workspace.CreatedBy = currentUser.Username;
        workspace.EditedBy = currentUser.Username;

        await _workspaceRepository.AddAsync(workspace, cancellationToken);

        var roles = await _roleService.CreateDefaultRolesForWorkspaceAsync(workspace, currentUser, cancellationToken);
        var role = roles.FirstOrDefault(r => r.Name == DefaultRoleNames.Owner);

        var workspaceMember = _mapper.Map<WorkspaceMember>((workspace, currentUser, role));
        await _workspaceMemberRepository.AddAsync(workspaceMember, cancellationToken);

        await transaction.CommitAsync(cancellationToken);
    }

    public async Task<List<WorkspaceView>> SearchWorkspacesByNameAsync(string searchValue, int? limit, CancellationToken cancellationToken)
    {
        var searchedWorkspacesQueryable = _workspaceRepository.SearchByName(searchValue)
            .ProjectTo<WorkspaceView>(_mapper.ConfigurationProvider);

        if (limit.HasValue)
        {
            searchedWorkspacesQueryable = searchedWorkspacesQueryable.Take(limit.Value);
        }

        return await searchedWorkspacesQueryable.ToListAsync(cancellationToken);
    }
}
