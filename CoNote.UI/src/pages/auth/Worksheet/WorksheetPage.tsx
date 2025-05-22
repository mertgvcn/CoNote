import { useEffect } from "react";
import { useParams } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { selectWorksheetLoading } from "../../../features/worksheet/slices/worksheetSlice";
import {
  addComponentToStore,
  componentSelectors,
  removeComponentFromStore,
} from "../../../features/component/slices/componentSlice";
//dnd-kit
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
//hooks
import { useWorksheetData } from "../../../features/worksheet/hooks/useWorksheetData";
import { useComponentData } from "../../../features/component/hooks/useComponentData";
//utils
import { componentService } from "../../../features/component/componentService";
import { componentDefaults } from "../../../utils/ComponentDefaults";
import { signalRManager } from "../../../utils/SignalR/signalRManager";
import { HUB_ENDPOINTS, HUB_NAMES } from "../../../utils/SignalR/hubConstants";
//models
import { ComponentView } from "../../../models/views/ComponentView";
import { CreateComponentRequest } from "../../../api/Component/models/CreateComponentRequest";
import { ComponentType } from "../../../models/enums/ComponentType";
//components
import { Stack } from "@mui/material";
import Loading from "../../../components/ui/Loading";
import WorksheetPanel from "./components/WorksheetPanel";
import WorksheetDroppable from "./components/WorksheetDroppable";

interface DroppedComponentData {
  type: ComponentType;
  [key: string]: any;
}

const WorksheetPage = () => {
  const { id } = useParams();
  const worksheetId = Number(id);
  const sensors = useSensors(useSensor(PointerSensor));

  const dispatch = useDispatch<AppDispatch>();
  useWorksheetData(worksheetId);
  useComponentData(worksheetId);

  const components = useSelector(componentSelectors.selectAll);
  const worksheetSettingsLoading = useSelector(selectWorksheetLoading);

  useEffect(() => {
    setupHubConnection();

    return () => {
      signalRManager.disconnect(HUB_NAMES.WORKSHEET);
    };
  }, [id]);

  const setupHubConnection = async () => {
    try {
      await signalRManager.connect(HUB_NAMES.WORKSHEET, {
        hubEndpoints: HUB_ENDPOINTS.WORKSHEET,
        onMessage: {
          ReceiveComponentAdded: (component: ComponentView) => {
            dispatch(addComponentToStore(component));
          },
          ReceiveComponentDeleted: (componentId: number) => {
            dispatch(removeComponentFromStore(componentId));
            console.log("Component deleted:", componentId);
          },
        },
      });

      const hubConnection = signalRManager.getConnection(HUB_NAMES.WORKSHEET);
      if (hubConnection) {
        await hubConnection.invoke("JoinWorksheet", {
          WorksheetId: worksheetId,
        });
      }
    } catch (e: any) {
      console.error("Worksheet hub connection error:", e);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { over, active } = event;
    if (!over || over.id !== "worksheet-dropzone") return;

    const droppedComponentProperties = active.data
      ?.current as DroppedComponentData;
    const finalX = active.rect.current.translated?.left;
    const finalY = active.rect.current.translated?.top;

    const containerRect = over.rect;
    const relativeX = Math.max(0, finalX! - containerRect.left);
    const relativeY = Math.max(0, finalY! - containerRect.top);

    if (droppedComponentProperties) {
      const newComponent: CreateComponentRequest = {
        ...componentDefaults[droppedComponentProperties.type],
        worksheetId: Number(id),
        x: relativeX,
        y: relativeY,
      };

      var returnedComponent: ComponentView =
        await componentService.CreateComponent(newComponent);

      dispatch(addComponentToStore(returnedComponent));

      const hubConnection = signalRManager.getConnection(HUB_NAMES.WORKSHEET);
      if (hubConnection) {
        await hubConnection.invoke("ComponentAdded", returnedComponent);
      }
    }
  };

  if (worksheetSettingsLoading) return <Loading />;

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      collisionDetection={pointerWithin}
      sensors={sensors}
    >
      <Stack direction="row" gap={2} sx={{ width: "100%", height: "100%" }}>
        <WorksheetPanel />
        <WorksheetDroppable components={components} />
      </Stack>
    </DndContext>
  );
};

export default WorksheetPage;
