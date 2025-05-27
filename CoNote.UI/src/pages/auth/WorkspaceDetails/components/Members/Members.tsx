import { useState } from "react";
//models
import { MembersTab } from "./models/MembersTab";
//components
import { Button, Stack } from "@mui/material";
import Searchbar from "../../../../../components/ui/Searchbar";
import MembersSidebar from "./components/MembersSidebar";
import MemberList from "./components/MemberList/MemberList";
import InvitationsSentList from "./components/InvitationsSentList/InvitationsSentList";
import RequestsToJoinList from "./components/RequestsToJoinList/RequestsToJoinList";
import AddPeopleModal from "./components/AddPeopleModal/AddPeopleModal";

const Members = () => {
  const [showAddPeopleModal, setShowAddPeopleModal] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<MembersTab>(
    MembersTab.Members
  );

  return (
    <>
      <Stack direction="row" gap={1} flex={1}>
        <MembersSidebar
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />

        <Stack direction="column" gap={2} flex={1}>
          <Stack direction="row" gap={2}>
            <Searchbar color="secondary" value={searchValue} />
            <Button
              variant="contained"
              color="secondary"
              sx={{ flexShrink: 0 }}
              onClick={() => setShowAddPeopleModal(true)}
            >
              Add people
            </Button>
          </Stack>

          {selectedTab === MembersTab.Members && <MemberList />}
          {selectedTab === MembersTab.InvitationsSent && (
            <InvitationsSentList />
          )}
          {selectedTab === MembersTab.RequestsToJoin && <RequestsToJoinList />}
        </Stack>
      </Stack>

      <AddPeopleModal open={showAddPeopleModal} onClose={() => setShowAddPeopleModal(false)}/>
    </>
  );
};

export default Members;
