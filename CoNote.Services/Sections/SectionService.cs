using AutoMapper;
using CoNote.Core.Entities;
using CoNote.Core.Enums;
using CoNote.Core.Exceptions;
using CoNote.Data.Repositories.Interfaces;
using CoNote.Infrastructure.Utilities.Transaction.Interfaces;
using CoNote.Services.Permissions.Interfaces;
using CoNote.Services.Sections.Interfaces;
using CoNote.Services.Sections.Models;
using CoNote.Services.Users.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CoNote.Services.Sections;
public class SectionService : ISectionService
{
    private readonly ISectionRepository _sectionRepository;
    private readonly IWorkspaceRepository _workspaceRepository;
    private readonly IUserService _userService;
    private readonly IPermissionService _permissionService;
    private readonly ITransactionService _transactionService;
    private readonly IMapper _mapper;

    public SectionService(
        ISectionRepository sectionRepository,
        IWorkspaceRepository workspaceRepository,
        IUserService userService,
        IPermissionService permissionService,
        ITransactionService transactionService,
        IMapper mapper)
    {
        _sectionRepository = sectionRepository;
        _userService = userService;
        _workspaceRepository = workspaceRepository;
        _permissionService = permissionService;
        _transactionService = transactionService;
        _mapper = mapper;
    }

    public async Task CreateSectionAsync(CreateSectionRequest request, CancellationToken cancellationToken)
    {
        var hasPermission = await _permissionService.HasCurrentUserSpecificPermissionOnWorkspaceAsync(
            request.WorkspaceId,
            PermissionAction.Add,
            PermissionObjectType.Section,
            cancellationToken);

        if (!hasPermission)
        {
            throw new UnauthorizedUserAccessException();
        }

        if (request.ParentId.HasValue)
        {
            if (await _sectionRepository.ExistsByIdAsync(request.ParentId.Value, cancellationToken) == false)
            {
                throw new SectionNotFoundException();
            }
        }

        using var transaction = await _transactionService.CreateTransactionAsync(cancellationToken);

        var currentUser = await _userService.GetCurrentUserAsync(cancellationToken);

        var section = _mapper.Map<Section>(request);
        section.CreatedBy = currentUser.Username;
        section.EditedBy = currentUser.Username;

        await _sectionRepository.AddAsync(section, cancellationToken);

        await transaction.CommitAsync(cancellationToken);
    }

    public async Task<List<SectionTreeViewModel>> GetSectionTreeByWorkspaceIdAsync(long workspaceId, CancellationToken cancellationToken)
    {
        var allSections = _sectionRepository.GetListByWorkspaceId(workspaceId);

        return await BuildSectionTree(allSections, cancellationToken);
    }

    private async Task<List<SectionTreeViewModel>> BuildSectionTree(IQueryable<Section> allSections, CancellationToken cancellationToken, long? parentId = null)
    { //TODO: Algoritmayý geliþtir
        var sections = await allSections
            .Where(s => s.ParentId == parentId)
            .Include(s => s.Children)
            .ToListAsync(cancellationToken);

        var sectionTree = new List<SectionTreeViewModel>();

        foreach (var section in sections)
        {
            var sectionTreeViewModel = new SectionTreeViewModel
            {
                Id = section.Id,
                Label = section.Name,
                Children = await BuildSectionTree(allSections, cancellationToken, section.Id)
            };

            sectionTree.Add(sectionTreeViewModel);
        }

        return sectionTree;
    }

}
