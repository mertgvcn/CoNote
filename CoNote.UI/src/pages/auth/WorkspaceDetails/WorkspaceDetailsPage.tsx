import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//redux
import { useSelector } from "react-redux";
import {
  selectWorkspaceDetailsLoading,
  selectWorkspaceDetailsSettings,
} from "../../../features/workspace/slices/workspaceDetailsSlice";
import {
  selectPermissions,
  selectPermissionsLoading,
} from "../../../features/permission/slices/permissionSlice";
//models
import { WorkspaceDetailsTab } from "./models/WorkspaceDetailsTab";
import { PermissionAction } from "../../../models/enums/PermissionAction";
import { PermissionObjectType } from "../../../models/enums/PermissionObjectType";
//icons
import LockIcon from "@mui/icons-material/Lock";
import PublicIcon from "@mui/icons-material/Public";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchOffIcon from "@mui/icons-material/SearchOff";
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
import PermissionGate from "../../../components/ui/PermissionGate";

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
  const workspaceDetailsLoading = useSelector(selectWorkspaceDetailsLoading);

  const permissions = useSelector(selectPermissions);
  const permissionsLoading = useSelector(selectPermissionsLoading);

  const [selectedTab, setSelectedTab] = useState<WorkspaceDetailsTab>(
    WorkspaceDetailsTab.Structure
  );

  useEffect(() => {
    setSelectedTab(WorkspaceDetailsTab.Structure);
  }, [id]);

  if (workspaceDetailsLoading || permissionsLoading) return <Loading />;

  if (permissions.length === 0)
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%", height: "100%" }}
      >
        <SearchOffIcon fontSize="large" color="error"/>
        <Typography variant="h6" color="error">Workspace not found</Typography>
      </Stack>
    );

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
            {workspaceSettings?.isPrivate ? (
              <LockIcon sx={{ fontSize: 16 }} />
            ) : (
              <PublicIcon sx={{ fontSize: 16 }} />
            )}

            <Typography variant="button">
              {workspaceSettings?.isPrivate ? "Private" : "Public"}
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Tabs withBottomBorder>
        <PermissionGate
          action={PermissionAction.View}
          objectType={PermissionObjectType.Structure}
        >
          <Tab
            label="Structure"
            muiIcon={<AccountTreeIcon fontSize="small" />}
            isActive={selectedTab === WorkspaceDetailsTab.Structure}
            onClick={() => {
              setSelectedTab(WorkspaceDetailsTab.Structure);
            }}
          />
        </PermissionGate>

        <PermissionGate
          action={PermissionAction.View}
          objectType={PermissionObjectType.Members}
        >
          <Tab
            label="Members"
            muiIcon={<GroupsIcon fontSize="small" />}
            isActive={selectedTab === WorkspaceDetailsTab.Members}
            onClick={() => {
              setSelectedTab(WorkspaceDetailsTab.Members);
            }}
          />
        </PermissionGate>

        <PermissionGate
          action={PermissionAction.View}
          objectType={PermissionObjectType.Settings}
        >
          <PermissionGate
            action={PermissionAction.Edit}
            objectType={PermissionObjectType.Settings}
          >
            <Tab
              label="Settings"
              muiIcon={<SettingsIcon fontSize="small" />}
              isActive={selectedTab === WorkspaceDetailsTab.Settings}
              onClick={() => {
                setSelectedTab(WorkspaceDetailsTab.Settings);
              }}
            />
          </PermissionGate>
        </PermissionGate>
      </Tabs>

      {selectedTab === WorkspaceDetailsTab.Structure && <Structure />}
      {selectedTab === WorkspaceDetailsTab.Members && <Members />}
      {selectedTab === WorkspaceDetailsTab.Settings && <Settings />}
    </Stack>
  );
};

export default WorkspaceDetailsPage;
