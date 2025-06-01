using AutoMapper;
using CoNote.Core.Entities;
using CoNote.Core.Exceptions;
using CoNote.Data.Repositories.Interfaces;
using CoNote.Services.WorkspaceMembers.Interfaces;
using CoNote.Services.WorkspaceMembers.Models;

namespace CoNote.Services.WorkspaceMembers;
public class WorkspaceMemberService : IWorkspaceMemberService
{
    private readonly IWorkspaceMemberRepository _workspaceMemberRepository;
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public WorkspaceMemberService(
        IWorkspaceMemberRepository workspaceMemberRepository,
        IUserRepository userRepository,
        IMapper mapper)
    {
        _workspaceMemberRepository = workspaceMemberRepository;
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task AddMemberToWorkspaceAsync(AddMemberToWorkspaceRequest request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByIdAsync(request.UserId);
        if (user == null)
        {
            throw new UserNotFoundException();
        }

        var workspaceMember = _mapper.Map<WorkspaceMember>(request);
        workspaceMember.CreatedBy = user.Username;
        workspaceMember.EditedBy = user.Username;

        await _workspaceMemberRepository.AddAsync(workspaceMember);
    }
}
