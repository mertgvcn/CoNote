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
    private readonly IRoleService _roleService;
    private readonly IHttpContextService _httpContextService;
    private readonly ITransactionService _transactionService;
    private readonly IMapper _mapper;

    public WorkspaceService(
        IWorkspaceRepository workspaceRepository,
        IUserRepository userRepository,
        IWorkspaceMemberRepository workspaceMemberRepository,
        IRoleService roleService,
        IHttpContextService httpContextService,
        ITransactionService transactionService,
        IMapper mapper)
    {
        _workspaceRepository = workspaceRepository;
        _userRepository = userRepository;
        _workspaceMemberRepository = workspaceMemberRepository;
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
