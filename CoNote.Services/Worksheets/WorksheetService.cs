using AutoMapper;
using AutoMapper.QueryableExtensions;
using CoNote.Core.Entities;
using CoNote.Core.Exceptions;
using CoNote.Data.Repositories.Interfaces;
using CoNote.Infrastructure.Utilities.HttpContext.Interfaces;
using CoNote.Infrastructure.Utilities.Transaction.Interfaces;
using CoNote.Services.Worksheets.Interfaces;
using CoNote.Services.Worksheets.Models;
using Microsoft.EntityFrameworkCore;

namespace CoNote.Services.Worksheets;
public class WorksheetService : IWorksheetService
{
    private readonly IWorksheetRepository _worksheetRepository;
    private readonly IUserRepository _userRepository;
    private readonly IWorkspaceRepository _workspaceRepository;
    private readonly ISectionRepository _sectionRepository;
    private readonly IHttpContextService _httpContextService;
    private readonly ITransactionService _transactionService;
    private readonly IMapper _mapper;

    public WorksheetService(
        IWorksheetRepository worksheetRepository,
        IUserRepository userRepository,
        IWorkspaceRepository workspaceRepository,
        ISectionRepository sectionRepository,
        IHttpContextService httpContextService,
        ITransactionService transactionService,
        IMapper mapper)
    {
        _worksheetRepository = worksheetRepository;
        _userRepository = userRepository;
        _workspaceRepository = workspaceRepository;
        _sectionRepository = sectionRepository;
        _httpContextService = httpContextService;
        _transactionService = transactionService;
        _mapper = mapper;
    }

    public async Task CreateWorksheetAsync(CreateWorksheetRequest request, CancellationToken cancellationToken)
    {
        var currentUserId = _httpContextService.GetCurrentUserId();
        var currentUser = await _userRepository.GetByIdAsync(currentUserId, cancellationToken);

        if (currentUser == null)
        {
            throw new UserNotFoundException();
        }

        if (await _workspaceRepository.ExistsByIdAsync(request.WorkspaceId, cancellationToken) == false)
        {
            throw new WorkspaceNotFoundException();
        }

        if (request.SectionId.HasValue)
        {
            if (await _sectionRepository.ExistsByIdAsync(request.SectionId.Value, cancellationToken) == false)
            {
                throw new SectionNotFoundException();
            }
        }

        using var transaction = await _transactionService.CreateTransactionAsync(cancellationToken);

        var worksheet = _mapper.Map<Worksheet>(request);
        worksheet.CreatedBy = currentUser.Username;
        worksheet.EditedBy = currentUser.Username;

        await _worksheetRepository.AddAsync(worksheet, cancellationToken);
        await transaction.CommitAsync(cancellationToken);
    }


    public async Task<WorksheetSettingsView> GetSettingsByWorksheetIdAsync(long worksheetId, CancellationToken cancellationToken)
    {
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
