import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//redux
import { useSelector } from "react-redux";
import {
  selectWorkspaceDetailsLoading,
  selectWorkspaceDetailsSettings,
} from "../../../features/workspace/slices/workspaceDetailsSlice";
//models
import { WorkspaceDetailsTab } from "./models/WorkspaceDetailsTab";
//icons
import LockIcon from "@mui/icons-material/Lock";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
//hooks
import { useWorkspaceDetails } from "../../../features/workspace/hooks/useWorkspaceDetailsData";
//components
import { Box, Stack, styled, Typography } from "@mui/material";
import Loading from "../../../components/ui/Loading";
import Tabs from "../../../components/ui/Tabs/Tabs";
import Tab from "../../../components/ui/Tabs/components/Tab";
import Structure from "./components/Structure/Structure";
import Members from "./components/Members/Members";
import Settings from "./components/Settings/Settings";

const ImageContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 150,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#550293",
}));

const WorkspaceDetailsPage = () => {
  const { id } = useParams();

  useWorkspaceDetails(Number(id));

  const workspaceSettings = useSelector(selectWorkspaceDetailsSettings);
  const loading = useSelector(selectWorkspaceDetailsLoading);

  const [selectedTab, setSelectedTab] = useState<WorkspaceDetailsTab>(
    WorkspaceDetailsTab.Structure
  );

  useEffect(() => {
    setSelectedTab(WorkspaceDetailsTab.Structure);
  }, [id]);

  if (loading) return <Loading />;

  return (
    <Stack direction="column" spacing={2} height="100%">
      <Stack direction="row" spacing={2}>
        <Box minWidth={224}>
          <ImageContainer></ImageContainer>
        </Box>

        <Stack
          direction="column"
          flex={1}
          spacing={1}
          maxWidth={600}
          maxHeight={150}
        >
          <Typography variant="h2" fontWeight={500}>
            {workspaceSettings?.name}
          </Typography>
          <Typography variant="h6" color="grey.500">
            {workspaceSettings?.description}
          </Typography>
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            color="grey.600"
          >
            <LockIcon sx={{ fontSize: 16 }} />
            <Typography variant="button">Private</Typography>
          </Stack>
        </Stack>
      </Stack>

      <Tabs withBottomBorder>
        <Tab
          label="Structure"
          muiIcon={<AccountTreeIcon fontSize="small" />}
          isActive={selectedTab === WorkspaceDetailsTab.Structure}
          onClick={() => {
            setSelectedTab(WorkspaceDetailsTab.Structure);
          }}
        />
        <Tab
          label="Members"
          muiIcon={<GroupsIcon fontSize="small" />}
          isActive={selectedTab === WorkspaceDetailsTab.Members}
          onClick={() => {
            setSelectedTab(WorkspaceDetailsTab.Members);
          }}
        />
        <Tab
          label="Settings"
          muiIcon={<SettingsIcon fontSize="small" />}
          isActive={selectedTab === WorkspaceDetailsTab.Settings}
          onClick={() => {
            setSelectedTab(WorkspaceDetailsTab.Settings);
          }}
        />
      </Tabs>

      {selectedTab === WorkspaceDetailsTab.Structure && <Structure />}
      {selectedTab === WorkspaceDetailsTab.Members && <Members />}
      {selectedTab === WorkspaceDetailsTab.Settings && <Settings />}
    </Stack>
  );
};

export default WorkspaceDetailsPage;
