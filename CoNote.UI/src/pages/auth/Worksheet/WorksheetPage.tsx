import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import WorksheetPanel from "./components/WorksheetPanel";

const WorksheetPage = () => {
  const { id } = useParams();

  return (
    <Stack direction="row" sx={{ width: "100%", height: "100%" }}>
      <WorksheetPanel />
    </Stack>
  );
};

export default WorksheetPage;
