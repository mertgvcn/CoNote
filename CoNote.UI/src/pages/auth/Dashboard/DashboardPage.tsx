//redux
import { useSelector } from "react-redux";
import {
  selectWorkspaceLoading,
  workspaceSelectors,
} from "../../../features/workspace/workspaceSlice";
//components
import Loading from "../../../components/ui/Loading";
import { Box } from "@mui/material";

const DashboardPage = () => {
  const workspaces = useSelector(workspaceSelectors.selectAll);
  const loading = useSelector(selectWorkspaceLoading);

  if (loading) {
    return <Loading />;
  }

  return <Box>{workspaces.map((w) => w.name)}</Box>;
};

export default DashboardPage;
