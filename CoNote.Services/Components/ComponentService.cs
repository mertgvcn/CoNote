using AutoMapper;
using CoNote.Core.Entities;
using CoNote.Core.Enums;
using CoNote.Core.Exceptions;
using CoNote.Data.Repositories.Interfaces;
using CoNote.Services.Components.Interfaces;
using CoNote.Services.Components.Models;
using CoNote.Services.Permissions.Interfaces;
using CoNote.Services.Users.Interfaces;

namespace CoNote.Services.Components;
public class ComponentService : IComponentService
{
    private readonly IComponentRepository _componentRepository;
    private readonly IWorksheetRepository _worksheetRepositry;
    private readonly IUserService _userService;
    private readonly IPermissionService _permissionService;
    private readonly IMapper _mapper;

    public ComponentService(
        IComponentRepository componentRepository,
        IWorksheetRepository worksheetRepositry,
        IUserService userService,
        IPermissionService permissionService,
        IMapper mapper)
    {
        _componentRepository = componentRepository;
        _worksheetRepositry = worksheetRepositry;
        _userService = userService;
        _permissionService = permissionService;
        _mapper = mapper;
    }

    public async Task<List<Component>> GetComponentsByWorksheetIdAsync(long worksheetId, CancellationToken cancellationToken)
    {
        var workspaceId = await _worksheetRepositry.GetWorkspaceIdByIdAsnyc(worksheetId, cancellationToken);

        var hasPermission = await _permissionService.HasCurrentUserSpecificPermissionOnWorkspaceAsync(
            workspaceId,
            PermissionAction.View,
            PermissionObjectType.Component,
            cancellationToken);

        if (!hasPermission)
        {
            throw new UnauthorizedUserAccessException();
        }

        var components = await _componentRepository.GetListByWorksheetId(worksheetId, cancellationToken);
        return components;
    }

    public async Task<Component> CreateComponentAsync(CreateComponentRequest request, CancellationToken cancellationToken)
    {
        var workspaceId = await _worksheetRepositry.GetWorkspaceIdByIdAsnyc(request.WorksheetId, cancellationToken);

        var hasPermission = await _permissionService.HasCurrentUserSpecificPermissionOnWorkspaceAsync(
            workspaceId,
            PermissionAction.Add,
            PermissionObjectType.Component,
            cancellationToken);

        if (!hasPermission)
        {
            throw new UnauthorizedUserAccessException();
        }

        var currentUser = await _userService.GetCurrentUserAsync(cancellationToken);

        var newComponent = _mapper.Map<Component>(request);
        newComponent.CreatedBy = currentUser.Username;
        newComponent.EditedBy = currentUser.Username;

        var component = await _componentRepository.AddAsync(newComponent, cancellationToken);
        return component;
    }

    public async Task<Component> UpdateComponentAsync(UpdateComponentRequest request, CancellationToken cancellationToken)
    {
        var workspaceId = await _componentRepository.GetWorkspaceIdById(request.Id, cancellationToken);

        var hasPermission = await _permissionService.HasCurrentUserSpecificPermissionOnWorkspaceAsync(
            workspaceId,
            PermissionAction.Edit,
            PermissionObjectType.Component,
            cancellationToken);

        if (!hasPermission)
        {
            throw new UnauthorizedUserAccessException();
        }

        var currentUser = await _userService.GetCurrentUserAsync(cancellationToken);

        var component = await _componentRepository.GetByIdAsync(request.Id, cancellationToken);
        if (component == null)
        {
            throw new ComponentNotFoundException();
        }

        component = _mapper.Map(request, component);
        component.EditedBy = currentUser.Username;
        component.EditedAt = DateTime.UtcNow;

        await _componentRepository.UpdateAsync(component, cancellationToken);
        return component;
    }

    public async Task<long> DeleteComponentAsync(long componentId, CancellationToken cancellationToken)
    {
        var componentExists = await _componentRepository.ExistsByIdAsync(componentId, cancellationToken);
        if (!componentExists)
        {
            throw new ComponentNotFoundException();
        }

        var workspaceId = await _componentRepository.GetWorkspaceIdById(componentId, cancellationToken);

        var hasPermission = await _permissionService.HasCurrentUserSpecificPermissionOnWorkspaceAsync(
            workspaceId,
            PermissionAction.Delete,
            PermissionObjectType.Component,
            cancellationToken);

        if (!hasPermission)
        {
            throw new UnauthorizedUserAccessException();
        }

        await _componentRepository.DeleteAsync(componentId, cancellationToken);
        return componentId;
    }
}
