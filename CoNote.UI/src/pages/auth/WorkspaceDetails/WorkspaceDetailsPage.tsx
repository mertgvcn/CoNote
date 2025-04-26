import { useState } from "react";
import { useParams } from "react-router-dom";
//models
import { WorkspaceDetailsTab } from "./models/WorkspaceDetailsTab";
//icons
import LockIcon from '@mui/icons-material/Lock';
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
//components
import {
  Box,
  Button,
  Stack,
  styled,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

const ImageContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 150,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#550293",
}));

const WorkspaceDetailsPage = () => {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState<WorkspaceDetailsTab>(
    WorkspaceDetailsTab.Structure
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" spacing={2}>
        <Box width={150}>
          <ImageContainer></ImageContainer>
        </Box>

        <Stack direction="column" flex={1} spacing={1} maxWidth={600} maxHeight={150}>
          <Typography variant="h2" fontWeight={500}>
            MyWorkspace
          </Typography>
          <Typography variant="h6" color="grey.500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
            dolores quibusdam veniam praesentium. 
          </Typography>
          <Stack direction="row" spacing={0.5} alignItems="center" color="grey.600">
            <LockIcon sx={{ fontSize: 16 }} />
            <Typography variant="button">Private</Typography>
          </Stack>
        </Stack>
      </Stack>

      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab
          icon={<AccountTreeIcon fontSize="small" />}
          iconPosition="start"
          label="Structure"
        />
        <Tab
          icon={<GroupsIcon fontSize="small" />}
          iconPosition="start"
          label="Members"
        />
        <Tab
          icon={<SettingsIcon fontSize="small" />}
          iconPosition="start"
          label="Settings"
        />
      </Tabs>
    </Stack>
  );
};

export default WorkspaceDetailsPage;
