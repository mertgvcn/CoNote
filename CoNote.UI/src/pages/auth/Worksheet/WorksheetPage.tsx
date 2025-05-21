import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//redux
import { useSelector } from "react-redux";
import { selectWorksheetLoading } from "../../../features/worksheet/slices/worksheetSlice";
//dnd-kit
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
//signalr
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
//hooks
import { useWorksheetData } from "../../../features/worksheet/hooks/useWorksheetData";
//utils
import { componentService } from "../../../features/component/componentService";
import { componentDefaults } from "../../../utils/ComponentDefaults";
//models
import { ComponentView } from "../../../models/views/ComponentView";
import { CreateComponentRequest } from "../../../api/Component/models/CreateComponentRequest";
import { ComponentType } from "../../../models/enums/ComponentType";
//components
import { Stack } from "@mui/material";
import Loading from "../../../components/ui/Loading";
import WorksheetPanel from "./components/WorksheetPanel";
import WorksheetDroppable from "./components/WorksheetDroppable";
import { getCookie } from "../../../utils/CookieManager";

const BACKEND_BASEURL = process.env.REACT_APP_BACKEND_BASEURL;

interface DroppedComponentData {
  type: ComponentType;
  [key: string]: any;
}

const WorksheetPage = () => {
  const { id } = useParams();
  useWorksheetData(Number(id));

  const loading = useSelector(selectWorksheetLoading);

  const [components, setComponents] = useState<ComponentView[]>([]);
  const [hubConnection, setHubConnection] = useState<HubConnection>();

  useEffect(() => {
    setupHubConnection();
    fetchComponents();
  }, [id]);

  const setupHubConnection = async () => {
    const hubConnection = new HubConnectionBuilder()
      .withUrl(`${BACKEND_BASEURL}/ws/worksheet`, {
        accessTokenFactory: () => getCookie("access_token"),
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    try {
      hubConnection.on("ReceiveComponentAdded", (component: ComponentView) => {
        setComponents((prev) => [...prev, component]);
      });

      await hubConnection.start();
      setHubConnection(hubConnection);

      await hubConnection.invoke("JoinWorksheet", {
        WorksheetId: Number(id),
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  const fetchComponents = async () => {
    const response = await componentService.GetComponentsByWorksheetId(
      Number(id)
    );
    setComponents(response);
  };

  const sensors = useSensors(useSensor(PointerSensor));

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

      setComponents((prev) => [...prev, returnedComponent]);

      if (hubConnection) {
        await hubConnection.invoke("ComponentAdded", returnedComponent);
      }
    }
  };

  if (loading) return <Loading />;

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
