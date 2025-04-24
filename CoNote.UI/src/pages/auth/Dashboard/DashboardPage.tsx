//redux
import { useSelector } from "react-redux";
import {
  selectWorkspaceLoading,
  workspaceSelectors,
} from "../../../features/workspace/workspaceSlice";
//components
import Loading from "../../../components/ui/Loading";
import { Box, Stack, Typography } from "@mui/material";
import Workspace from "./component/Workspace";

const DashboardPage = () => {
  const workspaces = useSelector(workspaceSelectors.selectAll);
  const loading = useSelector(selectWorkspaceLoading);

  if (loading) {
    return <Loading />;
  }

  return (
    <Stack direction="column" spacing={4}>
      <Stack direction="column" spacing={2}>
        <Typography variant="h4">Owned Workspaces</Typography>
        <Stack direction="row" spacing={2}>
          {workspaces.map((workspace, index: number) => (
            <Workspace workspace={workspace} key={index} />
          ))}
        </Stack>
      </Stack>
      <Stack direction="column" spacing={2}>
        <Typography variant="h4">Joined Workspaces</Typography>
        <Stack direction="row" spacing={2}>
          {workspaces.map((workspace, index: number) => (
            <Workspace workspace={workspace} key={index} />
          ))}
        </Stack>
      </Stack>
      <Stack direction="column" spacing={2}>
        <Typography variant="h4">Last Visited</Typography>
        <Stack direction="row" spacing={2}>
          {workspaces.map((workspace, index: number) => (
            <Workspace workspace={workspace} key={index} />
          ))}
        </Stack>
      </Stack>
      <Stack direction="column" spacing={2}>
        <Typography variant="h4">Favorite Workspaces</Typography>
        <Stack direction="row" spacing={2}>
          {workspaces.map((workspace, index: number) => (
            <Workspace workspace={workspace} key={index} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DashboardPage;
