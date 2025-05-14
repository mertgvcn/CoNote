import { useState } from "react";
import { useParams } from "react-router-dom";
//redux
import { useSelector } from "react-redux";
import { selectWorksheetLoading } from "../../../features/worksheet/slices/worksheetSlice";
// Hooks
import { useWorksheetData } from "../../../features/worksheet/hooks/useWorksheetData";
//components
import WorksheetPanel from "./components/WorksheetPanel";
import WorksheetDroppable from "./components/WorksheetDroppable";
import { Stack } from "@mui/material";
import Loading from "../../../components/ui/Loading";
//dnd-kit
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

const WorksheetPage = () => {
  const { id } = useParams();
  useWorksheetData(Number(id));

  const loading = useSelector(selectWorksheetLoading);
  const [droppedItems, setDroppedItems] = useState<any[]>([]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { over, active } = event;
    if (!over || over.id !== "worksheet-dropzone") return;

    const droppedData = active.data?.current;
    const finalX = active.rect.current.translated?.left;
    const finalY = active.rect.current.translated?.top;

    const containerRect = over.rect;

    const relativeX = Math.max(0, finalX - containerRect.left);
    const relativeY = Math.max(0, finalY - containerRect.top);

    if (droppedData) {
      setDroppedItems((prev) => [
        ...prev,
        {
          ...droppedData,
          x: relativeX,
          y: relativeY,
        },
      ]);
    }
  };

  if (loading) return <Loading />;

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <Stack direction="row" gap={2} sx={{ width: "100%", height: "100%" }}>
        <WorksheetPanel />
        <WorksheetDroppable droppedItems={droppedItems} />
      </Stack>
    </DndContext>
  );
};

export default WorksheetPage;
