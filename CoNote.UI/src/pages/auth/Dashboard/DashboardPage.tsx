//redux
import { useSelector } from "react-redux";
import {
  selectWorkspaceLoading,
  workspaceSelectors,
} from "../../../features/workspace/slices/workspaceSlice";
//components
import { Button, Stack, Typography } from "@mui/material";
import Loading from "../../../components/ui/Loading";
import WorkspaceCard from "./component/WorkspaceCard";
import Carousel from "../../../components/ui/Carousel/Carousel";

const DashboardPage = () => {
  const workspaces = useSelector(workspaceSelectors.selectAll);
  const loading = useSelector(selectWorkspaceLoading);

  if (loading) {
    return <Loading />;
  }

  return (
    <Stack direction="column" spacing={6}>
      {/* //TODO: Page başlığı eklenebilir "Dashboard" gibi */}
      <Stack direction="column">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5" fontWeight={"600"} ml={1}>
            Owned Workspaces
          </Typography>
          <Button variant="text" color="secondary" size="small">
            See all
          </Button>
        </Stack>
        <Carousel disableGap>
          {workspaces.map((workspace, index: number) => (
            <WorkspaceCard workspace={workspace} key={index} />
          ))}
        </Carousel>
      </Stack>

      <Stack direction="column">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5" fontWeight={"600"} ml={1}>
            Joined Workspaces
          </Typography>
          <Button variant="text" color="secondary" size="small">
            See all
          </Button>
        </Stack>
        <Carousel disableGap>
          {workspaces.map((workspace, index: number) => (
            <WorkspaceCard workspace={workspace} key={index} />
          ))}
        </Carousel>
      </Stack>

      <Stack direction="column">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5" fontWeight={"600"} ml={1}>
            Last Visited
          </Typography>
          <Button variant="text" color="secondary" size="small">
            See all
          </Button>
        </Stack>
        <Carousel disableGap>
          {workspaces.map((workspace, index: number) => (
            <WorkspaceCard workspace={workspace} key={index} />
          ))}
        </Carousel>
      </Stack>

      <Stack direction="column">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5" fontWeight={"600"} ml={1}>
            Favorite Workspaces
          </Typography>
          <Button variant="text" color="secondary" size="small">
            See all
          </Button>
        </Stack>
        <Carousel disableGap>
          {workspaces.map((workspace, index: number) => (
            <WorkspaceCard workspace={workspace} key={index} />
          ))}
        </Carousel>
      </Stack>
    </Stack>
  );
};

export default DashboardPage;
