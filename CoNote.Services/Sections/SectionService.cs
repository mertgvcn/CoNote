using AutoMapper;
using CoNote.Core.Entities;
using CoNote.Data.Repositories.Interfaces;
using CoNote.Infrastructure.Utilities.HttpContext.Interfaces;
using CoNote.Infrastructure.Utilities.Transaction.Interfaces;
using CoNote.Services.Sections.Interfaces;
using CoNote.Services.Sections.Models;

namespace CoNote.Services.Sections;
public class SectionService: ISectionService
{
    private readonly ISectionRepository _sectionRepository;
    private readonly IUserRepository _userRepository;
    private readonly IHttpContextService _httpContextService;
    private readonly ITransactionService _transactionService;
    private readonly IMapper _mapper;

    public SectionService(
    ISectionRepository sectionRepository,
    IUserRepository userRepository,
    IHttpContextService httpContextService,
    ITransactionService transactionService,
    IMapper mapper)
    {
        _sectionRepository = sectionRepository;
        _userRepository = userRepository;
        _httpContextService = httpContextService;
        _transactionService = transactionService;
        _mapper = mapper;
    }

    public async Task CreateSectionAsync(CreateSectionRequest request, CancellationToken cancellationToken)
    {
        var currentUserId = _httpContextService.GetCurrentUserId();
        var currentUser = await _userRepository.GetByIdAsync(currentUserId, cancellationToken);

        using var transaction = await _transactionService.CreateTransactionAsync(cancellationToken);

        var section = _mapper.Map<Section>(request);
        section.CreatedBy = currentUser.Username;
        section.EditedBy = currentUser.Username;

        await _sectionRepository.AddAsync(section, cancellationToken);
        await transaction.CommitAsync(cancellationToken);
    }
}
