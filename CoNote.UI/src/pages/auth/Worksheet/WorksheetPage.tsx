import { useParams } from "react-router-dom";
//redux
import { useSelector } from "react-redux";
import { selectWorksheetLoading } from "../../../features/worksheet/slices/worksheetSlice";
//utils
import { useWorksheetData } from "../../../features/worksheet/hooks/useWorksheetData";
//components
import { Stack } from "@mui/material";
import Loading from "../../../components/ui/Loading";
import WorksheetPanel from "./components/WorksheetPanel";
import WorksheetDroppable from "./components/WorksheetDroppable";

const WorksheetPage = () => {
  const { id } = useParams();
  useWorksheetData(Number(id));

  const loading = useSelector(selectWorksheetLoading);

  if (loading) return <Loading />;

  return (
    <Stack direction="row" gap={2} sx={{ width: "100%", height: "100%" }}>
      <WorksheetPanel />
      <WorksheetDroppable />
    </Stack>
  );
};

export default WorksheetPage;
