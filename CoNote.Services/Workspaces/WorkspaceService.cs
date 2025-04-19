using AutoMapper;
using CoNote.Core.Entities;
using CoNote.Data.Repositories.Interfaces;
using CoNote.Infrastructure.Utilities.HttpContext.Interfaces;
using CoNote.Infrastructure.Utilities.Transaction.Interfaces;
using CoNote.Services.Workspaces.Interfaces;
using CoNote.Services.Workspaces.Models;

namespace CoNote.Services.Workspaces;
public class WorkspaceService : IWorkspaceService
{
    private readonly IWorkspaceRepository _workspaceRepository;
    private readonly IUserRepository _userRepository;
    private readonly IHttpContextService _httpContextService;
    private readonly ITransactionService _transactionService;
    private readonly IMapper _mapper;

    public WorkspaceService(
        IWorkspaceRepository workspaceRepository,
        IUserRepository userRepository,
        IHttpContextService httpContextService,
        ITransactionService transactionService,
        IMapper mapper)
    {
        _workspaceRepository = workspaceRepository;
        _userRepository = userRepository;
        _httpContextService = httpContextService;
        _transactionService = transactionService;
        _mapper = mapper;
    }

    public async Task CreateWorkspaceAsync(CreateWorkspaceRequest request, CancellationToken cancellationToken)
    {
        var currentUserId = _httpContextService.GetCurrentUserId();
        var currentUser = await _userRepository.GetByIdAsync(currentUserId, cancellationToken);

        using var transaction = await _transactionService.CreateTransactionAsync(cancellationToken);

        var workspace = _mapper.Map<Workspace>(request);
        workspace.CreatedBy = currentUser.Username;
        workspace.EditedBy = currentUser.Username;

        await _workspaceRepository.AddAsync(workspace, cancellationToken);
        await transaction.CommitAsync(cancellationToken);
    }
}
