using AutoMapper;
using AutoMapper.QueryableExtensions;
using CoNote.Core.Entities;
using CoNote.Core.Enums;
using CoNote.Core.Exceptions;
using CoNote.Data.Repositories.Interfaces;
using CoNote.Infrastructure.Utilities.Transaction.Interfaces;
using CoNote.Services.Permissions.Interfaces;
using CoNote.Services.Users.Interfaces;
using CoNote.Services.Worksheets.Interfaces;
using CoNote.Services.Worksheets.Models;
using Microsoft.EntityFrameworkCore;

namespace CoNote.Services.Worksheets;
public class WorksheetService : IWorksheetService
{
    private readonly IWorksheetRepository _worksheetRepository;
    private readonly IWorkspaceRepository _workspaceRepository;
    private readonly ISectionRepository _sectionRepository;
    private readonly IUserService _userService;
    private readonly ITransactionService _transactionService;
    private readonly IPermissionService _permissionService;
    private readonly IMapper _mapper;

    public WorksheetService(
        IWorksheetRepository worksheetRepository,
        IWorkspaceRepository workspaceRepository,
        ISectionRepository sectionRepository,
        IUserService userService,
        ITransactionService transactionService,
        IPermissionService permissionService,
        IMapper mapper)
    {
        _worksheetRepository = worksheetRepository;
        _workspaceRepository = workspaceRepository;
        _sectionRepository = sectionRepository;
        _userService = userService;
        _transactionService = transactionService;
        _permissionService = permissionService;
        _mapper = mapper;
    }

    public async Task CreateWorksheetAsync(CreateWorksheetRequest request, CancellationToken cancellationToken)
    {
        if (await _workspaceRepository.ExistsByIdAsync(request.WorkspaceId, cancellationToken) == false)
        {
            throw new WorkspaceNotFoundException();
        }

        var hasPermission = await _permissionService.HasCurrentUserSpecificPermissionOnWorkspaceAsync(
            request.WorkspaceId,
            PermissionAction.Add,
            PermissionObjectType.Worksheet,
            cancellationToken);

        if (!hasPermission)
        {
            throw new UnauthorizedUserAccessException();
        }

        if (request.SectionId.HasValue)
        {
            if (await _sectionRepository.ExistsByIdAsync(request.SectionId.Value, cancellationToken) == false)
            {
                throw new SectionNotFoundException();
            }
        }

        using var transaction = await _transactionService.CreateTransactionAsync(cancellationToken);

        var currentUser = await _userService.GetCurrentUserAsync(cancellationToken);

        var worksheet = _mapper.Map<Worksheet>(request);
        worksheet.CreatedBy = currentUser.Username;
        worksheet.EditedBy = currentUser.Username;

        await _worksheetRepository.AddAsync(worksheet, cancellationToken);

        await transaction.CommitAsync(cancellationToken);
    }

    public async Task<WorksheetSettingsView> GetSettingsByWorksheetIdAsync(long worksheetId, CancellationToken cancellationToken)
    {
        var workspaceId = await _worksheetRepository.GetWorkspaceIdByIdAsnyc(worksheetId, cancellationToken);

        var hasPermission = await _permissionService.HasCurrentUserSpecificPermissionOnWorkspaceAsync(
            workspaceId,
            PermissionAction.View,
            PermissionObjectType.Worksheet,
            cancellationToken);

        if (!hasPermission)
        {
            throw new UnauthorizedUserAccessException();
        }

        var settingsView = await _worksheetRepository.GetById(worksheetId)
            .ProjectTo<WorksheetSettingsView>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync(cancellationToken);

        if (settingsView == null)
        {
            throw new WorksheetNotFoundException();
        }

        return settingsView;
    }
}
