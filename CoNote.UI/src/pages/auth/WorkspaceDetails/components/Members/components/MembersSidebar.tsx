//models
import { MembersTab } from "../models/MembersTab";
//components
import SidebarContainer from "../../../../../../components/layout/Sidebar/components/SidebarContainer";
import SidebarItemStack from "../../../../../../components/layout/Sidebar/components/SidebarItemStack";
import SidebarItem from "../../../../../../components/layout/Sidebar/components/SidebarItem";

type MembersSidebarPropsType = {
  selectedTab: MembersTab;
  setSelectedTab: React.Dispatch<React.SetStateAction<MembersTab>>;
};

const MembersSidebar = ({
  selectedTab,
  setSelectedTab,
}: MembersSidebarPropsType) => {
  return (
    <SidebarContainer withoutPaddingY>
      <SidebarItemStack>
        <SidebarItem
          label="Members (3)"
          color="secondary"
          isActive={selectedTab === MembersTab.Members}
          onClick={() => setSelectedTab(MembersTab.Members)}
        />
        <SidebarItem
          label="Invitations sent (2)"
          color="secondary"
          isActive={selectedTab === MembersTab.InvitationsSent}
          onClick={() => setSelectedTab(MembersTab.InvitationsSent)}
        />
        <SidebarItem
          label="Requests to join (1)"
          color="secondary"
          isActive={selectedTab === MembersTab.RequestsToJoin}
          onClick={() => setSelectedTab(MembersTab.RequestsToJoin)}
        />
      </SidebarItemStack>
    </SidebarContainer>
  );
};

export default MembersSidebar;
