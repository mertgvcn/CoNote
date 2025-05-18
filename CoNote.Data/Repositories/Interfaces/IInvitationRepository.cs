using CoNote.Core.Entities;

namespace CoNote.Data.Repositories.Interfaces;
public interface IInvitationRepository : IBaseRepository<Invitation>
{
    IQueryable<Invitation> GetListByWorkspaceId(long workspaceId);
    IQueryable<Invitation> GetListByReceiverId(long receiverId);
}
