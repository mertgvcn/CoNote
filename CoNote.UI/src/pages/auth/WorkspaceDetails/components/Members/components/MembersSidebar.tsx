//redux
import { useSelector } from "react-redux";
import {
  invitationSelectors,
  memberSelectors,
} from "../../../../../../features/workspace/slices/workspaceDetailsSlice";
//models
import { MembersTab } from "../models/MembersTab";
//components
import SidebarContainer from "../../../../../../components/layout/Sidebar/components/SidebarContainer";
import SidebarItemStack from "../../../../../../components/layout/Sidebar/components/SidebarItemStack";
import SidebarItem from "../../../../../../components/layout/Sidebar/components/SidebarItem";
import { InvitationType } from "../../../../../../models/enums/InvitationType";

type MembersSidebarPropsType = {
  selectedTab: MembersTab;
  setSelectedTab: React.Dispatch<React.SetStateAction<MembersTab>>;
};

const MembersSidebar = ({
  selectedTab,
  setSelectedTab,
}: MembersSidebarPropsType) => {
  const memberCount = useSelector(memberSelectors.selectTotal);

  const invitations = useSelector(invitationSelectors.selectAll);
  const invitationSentCount = invitations.filter(
    (invitation) => invitation.type === InvitationType.InviteSent
  ).length;
  const requestToJoinCount = invitations.filter(
    (invitation) => invitation.type === InvitationType.JoinRequest
  ).length;

  return (
    <SidebarContainer withoutPaddingY>
      <SidebarItemStack>
        <SidebarItem
          label={`Members (${memberCount})`}
          color="secondary"
          isActive={selectedTab === MembersTab.Members}
          onClick={() => setSelectedTab(MembersTab.Members)}
        />
        <SidebarItem
          label={`Invitations sent (${invitationSentCount})`}
          color="secondary"
          isActive={selectedTab === MembersTab.InvitationsSent}
          onClick={() => setSelectedTab(MembersTab.InvitationsSent)}
        />
        <SidebarItem
          label={`Requests to join (${requestToJoinCount})`}
          color="secondary"
          isActive={selectedTab === MembersTab.RequestsToJoin}
          onClick={() => setSelectedTab(MembersTab.RequestsToJoin)}
        />
      </SidebarItemStack>
    </SidebarContainer>
  );
};

export default MembersSidebar;
