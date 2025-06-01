import { useEffect } from "react";
import { useParams } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { selectWorksheetLoading } from "../../../features/worksheet/slices/worksheetSlice";
import {
  addComponentToStore,
  componentSelectors,
  createComponent,
  removeComponentFromStore,
  updateComponentInStore,
} from "../../../features/component/slices/componentSlice";
import {
  selectPermissions,
  selectPermissionsLoading,
} from "../../../features/permission/slices/permissionSlice";
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
import useHasPermission from "../../../features/permission/hooks/useHasPermission";
//utils
import { componentDefaults } from "../../../utils/ComponentDefaults";
import { signalRManager } from "../../../utils/SignalR/signalRManager";
import { HUB_ENDPOINTS, HUB_NAMES } from "../../../utils/SignalR/hubConstants";
//models
import { ComponentView } from "../../../models/views/ComponentView";
import { CreateComponentRequest } from "../../../api/Component/models/CreateComponentRequest";
import { ComponentType } from "../../../models/enums/ComponentType";
import { PermissionAction } from "../../../models/enums/PermissionAction";
import { PermissionObjectType } from "../../../models/enums/PermissionObjectType";
//icons
import SearchOffIcon from "@mui/icons-material/SearchOff";
//components
import { Stack, Typography } from "@mui/material";
import Loading from "../../../components/ui/Loading";
import WorksheetPanel from "./components/WorksheetPanel";
import WorksheetDroppable from "./components/WorksheetDroppable";
import PermissionGate from "../../../components/ui/PermissionGate";
import { RenderErrorToast } from "../../../utils/CustomToastManager";

interface DroppedComponentData {
  type: ComponentType;
  [key: string]: any;
}

const WorksheetPage = () => {
  const { workspaceId, worksheetId } = useParams();
  const workspaceIdParsed = Number(workspaceId);
  const worksheetIdParsed = Number(worksheetId);

  const sensors = useSensors(useSensor(PointerSensor));

  const dispatch = useDispatch<AppDispatch>();
  useWorksheetData(workspaceIdParsed, worksheetIdParsed);
  useComponentData(worksheetIdParsed);

  const components = useSelector(componentSelectors.selectAll);
  const worksheetSettingsLoading = useSelector(selectWorksheetLoading);

  const permissions = useSelector(selectPermissions);
  const permissionsLoading = useSelector(selectPermissionsLoading);

  const canEditComponents = useHasPermission(
    PermissionAction.Edit,
    PermissionObjectType.Component
  );

  useEffect(() => {
    setupHubConnection();

    return () => {
      signalRManager.disconnect(HUB_NAMES.WORKSHEET);
    };
  }, [worksheetIdParsed]);

  const setupHubConnection = async () => {
    try {
      await signalRManager.connect(HUB_NAMES.WORKSHEET, {
        hubEndpoints: HUB_ENDPOINTS.WORKSHEET,
        onMessage: {
          ReceiveComponentAdded: (component: ComponentView) => {
            dispatch(addComponentToStore(component));
          },
          ReceiveComponentUpdated: (component: ComponentView) => {
            dispatch(
              updateComponentInStore({
                id: component.id,
                changes: component,
              })
            );
          },
          ReceiveComponentDeleted: (componentId: number) => {
            dispatch(removeComponentFromStore(componentId));
          },
        },
      });

      const hubConnection = signalRManager.getConnection(HUB_NAMES.WORKSHEET);
      if (hubConnection) {
        await hubConnection.invoke("JoinWorksheet", {
          WorksheetId: worksheetIdParsed,
        });
      }
    } catch (e: any) {
      console.error("Worksheet hub connection error:", e);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { over, active } = event;
    if (!over || over.id !== "worksheet-dropzone") return;

    if (!canEditComponents) {
      RenderErrorToast("You do not have permission to add components to the worksheet.")
      return;
    }

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
        worksheetId: worksheetIdParsed,
        x: relativeX,
        y: relativeY,
      };

      const { payload: returnedComponent } = await dispatch(
        createComponent(newComponent)
      );

      const hubConnection = signalRManager.getConnection(HUB_NAMES.WORKSHEET);
      if (hubConnection) {
        await hubConnection.invoke("ComponentAdded", returnedComponent);
      }
    }
  };

  if (worksheetSettingsLoading || permissionsLoading) return <Loading />;

  if (permissions.length === 0)
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%", height: "100%" }}
      >
        <SearchOffIcon fontSize="large" color="error" />
        <Typography variant="h6" color="error">
          Worksheet not found
        </Typography>
      </Stack>
    );

  return (
    <PermissionGate
      action={PermissionAction.View}
      objectType={PermissionObjectType.Worksheet}
    >
      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={pointerWithin}
        sensors={sensors}
      >
        <Stack direction="row" gap={2} sx={{ width: "100%", height: "100%" }}>
          <WorksheetPanel />

          <PermissionGate
            action={PermissionAction.View}
            objectType={PermissionObjectType.Component}
          >
            <WorksheetDroppable components={components} />
          </PermissionGate>
        </Stack>
      </DndContext>
    </PermissionGate>
  );
};

export default WorksheetPage;
