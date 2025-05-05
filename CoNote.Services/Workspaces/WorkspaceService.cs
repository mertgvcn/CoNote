using AutoMapper;
using AutoMapper.QueryableExtensions;
using CoNote.Core.Constants;
using CoNote.Core.Entities;
using CoNote.Core.Exceptions;
using CoNote.Data.Repositories.Interfaces;
using CoNote.Infrastructure.Utilities.HttpContext.Interfaces;
using CoNote.Infrastructure.Utilities.Transaction.Interfaces;
using CoNote.Services.Roles.Interfaces;
using CoNote.Services.Workspaces.Interfaces;
using CoNote.Services.Workspaces.Models;
using Microsoft.EntityFrameworkCore;

namespace CoNote.Services.Workspaces;
public class WorkspaceService : IWorkspaceService
{
    private readonly IWorkspaceRepository _workspaceRepository;
    private readonly IUserRepository _userRepository;
    private readonly IWorkspaceMemberRepository _workspaceMemberRepository;
    private readonly IInvitationRepository _invitationRepository;
    private readonly ISectionRepository _sectionRepository;
    private readonly IWorksheetRepository _worksheetRepository;
    private readonly IRoleService _roleService;
    private readonly IHttpContextService _httpContextService;
    private readonly ITransactionService _transactionService;
    private readonly IMapper _mapper;

    public WorkspaceService(
        IWorkspaceRepository workspaceRepository,
        IUserRepository userRepository,
        IWorkspaceMemberRepository workspaceMemberRepository,
        IInvitationRepository invitationRepository,
        ISectionRepository sectionRepository,
        IWorksheetRepository worksheetRepository,
        IRoleService roleService,
        IHttpContextService httpContextService,
        ITransactionService transactionService,
        IMapper mapper)
    {
        _workspaceRepository = workspaceRepository;
        _userRepository = userRepository;
        _workspaceMemberRepository = workspaceMemberRepository;
        _invitationRepository = invitationRepository;
        _sectionRepository = sectionRepository;
        _worksheetRepository = worksheetRepository;
        _roleService = roleService;
        _httpContextService = httpContextService;
        _transactionService = transactionService;
        _mapper = mapper;
    }

    public async Task<List<WorkspaceView>> GetCurrentUserWorkspacesAsync(CancellationToken cancellationToken)
    {
        var currentUserId = _httpContextService.GetCurrentUserId();

        var workspaceViews = await _workspaceMemberRepository
           .GetWorkspacesByUserId(currentUserId)
           .ProjectTo<WorkspaceView>(_mapper.ConfigurationProvider)
           .ToListAsync(cancellationToken);

        return workspaceViews;
    }

    public async Task<List<StructureView>> GetStructureByWorkspaceAndSectionIdAsync(long workspaceId, long? sectionId, CancellationToken cancellationToken)
    {
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
        var memberViews = await _workspaceMemberRepository.GetListByWorkspaceId(workspaceId)
            .ProjectTo<MemberView>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        return memberViews;
    }

    public async Task<List<InvitationView>> GetInvitationsByWorkspaceIdAsync(long workspaceId, CancellationToken cancellationToken)
    {
        var invitationViews = await _invitationRepository.GetListByWorkspaceId(workspaceId)
            .ProjectTo<InvitationView>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        return invitationViews;
    }

    public async Task<WorkspaceSettingsView> GetSettingsByWorkspaceIdAsync(long workspaceId, CancellationToken cancellationToken)
    {
        var settingsView = await _workspaceRepository.GetById(workspaceId)
            .ProjectTo<WorkspaceSettingsView>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync(cancellationToken);

        if (settingsView == null)
        {
            throw new WorkspaceNotFoundException();
        }

        return settingsView;
    }

    public async Task CreateWorkspaceAsync(CreateWorkspaceRequest request, CancellationToken cancellationToken)
    {
        var currentUserId = _httpContextService.GetCurrentUserId();
        var currentUser = await _userRepository.GetByIdAsync(currentUserId, cancellationToken);

        if (currentUser == null)
        {
            throw new UserNotFoundException();
        }

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
}
