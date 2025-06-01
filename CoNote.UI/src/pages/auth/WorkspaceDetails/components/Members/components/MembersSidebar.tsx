//redux
import { useSelector } from "react-redux";
import {
  invitationSelectors,
  memberSelectors,
} from "../../../../../../features/workspace/slices/workspaceDetailsSlice";
//models
import { MembersTab } from "../models/MembersTab";
import { InvitationType } from "../../../../../../models/enums/InvitationType";
import { PermissionAction } from "../../../../../../models/enums/PermissionAction";
import { PermissionObjectType } from "../../../../../../models/enums/PermissionObjectType";
//components
import SidebarContainer from "../../../../../../components/layout/Sidebar/components/SidebarContainer";
import SidebarItemStack from "../../../../../../components/layout/Sidebar/components/SidebarItemStack";
import SidebarItem from "../../../../../../components/layout/Sidebar/components/SidebarItem";
import PermissionGate from "../../../../../../components/ui/PermissionGate";

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
        <PermissionGate
          action={PermissionAction.View}
          objectType={PermissionObjectType.Members}
        >
          <SidebarItem
            label={`Members (${memberCount})`}
            color="secondary"
            isActive={selectedTab === MembersTab.Members}
            onClick={() => setSelectedTab(MembersTab.Members)}
          />
        </PermissionGate>

        <PermissionGate
          action={PermissionAction.View}
          objectType={PermissionObjectType.Invitations}
        >
          <SidebarItem
            label={`Invitations sent (${invitationSentCount})`}
            color="secondary"
            isActive={selectedTab === MembersTab.InvitationsSent}
            onClick={() => setSelectedTab(MembersTab.InvitationsSent)}
          />
        </PermissionGate>

        <PermissionGate
          action={PermissionAction.View}
          objectType={PermissionObjectType.Invitations}
        >
          <SidebarItem
            label={`Requests to join (${requestToJoinCount})`}
            color="secondary"
            isActive={selectedTab === MembersTab.RequestsToJoin}
            onClick={() => setSelectedTab(MembersTab.RequestsToJoin)}
          />
        </PermissionGate>
      </SidebarItemStack>
    </SidebarContainer>
  );
};

export default MembersSidebar;
