using CoNote.Core.Entities;

namespace CoNote.Data.Repositories.Interfaces;
public interface IWorkspaceMemberRepository : IBaseRepository<WorkspaceMember>
{
    IQueryable<Workspace> GetWorkspacesByUserId(long userId);
    IQueryable<WorkspaceMember> GetListByWorkspaceId(long workspaceId);
}
