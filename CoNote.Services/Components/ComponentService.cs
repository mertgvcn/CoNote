using AutoMapper;
using CoNote.Core.Entities;
using CoNote.Core.Exceptions;
using CoNote.Data.Repositories.Interfaces;
using CoNote.Infrastructure.Utilities.HttpContext.Interfaces;
using CoNote.Services.Components.Interfaces;
using CoNote.Services.Components.Models;

namespace CoNote.Services.Components;
public class ComponentService : IComponentService
{
    private readonly IComponentRepository _componentRepository;
    private readonly IUserRepository _userRepository;
    private readonly IHttpContextService _httpContextService;
    private readonly IMapper _mapper;

    public ComponentService(
        IComponentRepository componentRepository,
        IUserRepository userRepository,
        IHttpContextService httpContextService,
        IMapper mapper)
    {
        _componentRepository = componentRepository;
        _userRepository = userRepository;
        _httpContextService = httpContextService;
        _mapper = mapper;
    }

    public async Task<Component> CreateComponentAsync(CreateComponentRequest request, CancellationToken cancellationToken)
    {
        var currentUserId = _httpContextService.GetCurrentUserId();
        var currentUser = await _userRepository.GetByIdAsync(currentUserId, cancellationToken);

        if (currentUser == null)
        {
            throw new UserNotFoundException();
        }

        var newComponent = _mapper.Map<Component>(request);
        newComponent.CreatedBy = currentUser.Username;
        newComponent.EditedBy = currentUser.Username;

        var component = await _componentRepository.AddAsync(newComponent, cancellationToken);
        return component;
    }
}
