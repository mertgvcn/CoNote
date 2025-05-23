import React, { useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "../../../app/store";
import {
  componentSelectors,
  deleteComponent,
  updateComponent,
  updateComponentInStore,
} from "../../../features/component/slices/componentSlice";
//moveable
import Moveable from "react-moveable";
//utils
import { getTransform } from "../../../utils/getTransform";
import { signalRManager } from "../../../utils/SignalR/signalRManager";
import { HUB_NAMES } from "../../../utils/SignalR/hubConstants";
import { throttle } from "lodash";
//models
import {
  ComponentView,
  StyleProperties,
} from "../../../models/views/ComponentView";
import { ComponentDeletedRequest } from "../../../models/hubs/worksheetHub/ComponentDeletedRequest";
import { ComponentUpdatedRequest } from "../../../models/hubs/worksheetHub/ComponentUpdatedRequest";
import { UpdateComponentRequest } from "../../../api/Component/models/UpdateComponentRequest";
//icons
import DeleteIcon from "@mui/icons-material/Delete";
//components
import { TextField, Box } from "@mui/material";
import ColorPicker from "../../ui/ColorPicker";
import TextEditorContainer from "../TextEditorContainer";
import IconButton from "../../ui/IconButton";

const throttledSendLiveUpdate = throttle(
  (
    updatedProperties: ComponentView,
    worksheetId: string,
    hubConnection: any
  ) => {
    const request: ComponentUpdatedRequest = {
      worksheetId: Number(worksheetId),
      component: updatedProperties,
    };
    hubConnection.invoke("ComponentUpdated", request);
  },
  350,
  { leading: false, trailing: true }
);

const throttledHandleChange = throttle(
  (
    dispatch: AppDispatch,
    componentId: number,
    component: ComponentView,
    updates: Partial<ComponentView>,
    sendLiveUpdate: (updatedProperties: ComponentView) => void
  ) => {
    dispatch(updateComponentInStore({ id: componentId, changes: updates }));
    const updatedComponent = { ...component, ...updates };
    sendLiveUpdate(updatedComponent);
  },
  100,
  { leading: false, trailing: true }
);

type HeartComponentProps = {
  id: number;
  selectedId: number | null;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
  boundsRef: React.RefObject<HTMLElement | null>;
  initialProperties: ComponentView;
};

const HeartComponent = ({
  id,
  selectedId,
  setSelectedId,
  boundsRef,
  initialProperties,
}: HeartComponentProps) => {
  const { id: worksheetId } = useParams();
  const targetRef = useRef<HTMLDivElement>(null);
  const moveableRef = useRef<Moveable>(null);
  const dispatch = useDispatch<AppDispatch>();

  const componentId = initialProperties.id;
  const component = useSelector((state: RootState) =>
    componentSelectors.selectById(state, componentId)
  )!;

  useEffect(() => {
    if (selectedId !== id) return;

    const handleClickOutside = async (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      const isInside = targetRef.current?.contains(target);
      const isMoveable = !!target.closest(".moveable-control-box");

      if (!isInside && !isMoveable) {
        const latestComponent = componentSelectors.selectById(
          store.getState() as RootState,
          componentId
        );
        if (latestComponent !== component) {
          const updateRequest: UpdateComponentRequest = {
            id: latestComponent.id,
            width: latestComponent.width,
            height: latestComponent.height,
            x: latestComponent.x,
            y: latestComponent.y,
            rotation: Math.round(latestComponent.rotation), // Ensure integer rotation
            zIndex: latestComponent.zIndex,
            content: latestComponent.content,
            style: latestComponent.style,
          };
          await dispatch(updateComponent(updateRequest));
        }
        setSelectedId(null);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, [selectedId, id, setSelectedId, dispatch, componentId]);

  useLayoutEffect(() => {
    if (selectedId === id) {
      moveableRef.current?.updateRect();
    }
  }, [component.width, component.height, selectedId, id]);

  const handleClick = () => {
    setSelectedId(id);
  };

  const handleChange = useCallback(
    (updates: Partial<ComponentView>) => {
      throttledHandleChange(
        dispatch,
        componentId,
        component,
        updates,
        sendLiveUpdate
      );
    },
    [dispatch, componentId, component]
  );

  const handleStyleChange = useCallback(
    (key: keyof StyleProperties, value: any) => {
      handleChange({ style: { ...component.style, [key]: value } });
    },
    [handleChange, component.style]
  );

  const handleDelete = async () => {
    await dispatch(deleteComponent(initialProperties.id));

    const hubConnection = signalRManager.getConnection(HUB_NAMES.WORKSHEET);
    if (hubConnection) {
      const request: ComponentDeletedRequest = {
        WorksheetId: Number(worksheetId),
        ComponentId: initialProperties.id,
      };
      await hubConnection.invoke("ComponentDeleted", request);
    }
  };

  const sendLiveUpdate = useCallback(
    (updatedProperties: ComponentView) => {
      const hubConnection = signalRManager.getConnection(HUB_NAMES.WORKSHEET);
      if (hubConnection && worksheetId) {
        throttledSendLiveUpdate(updatedProperties, worksheetId, hubConnection);
      }
    },
    [worksheetId]
  );

  return (
    <>
      <Box
        ref={targetRef}
        onClick={handleClick}
        style={{
          position: "absolute",
          width: `${component.width}px`,
          height: `${component.height}px`,
          transform: getTransform(component.x, component.y, component.rotation),
          zIndex: component.zIndex,
          cursor: "move",
        }}
      >
        {selectedId === id && (
          <TextEditorContainer>
            <TextField
              label="Width"
              type="number"
              size="small"
              variant="outlined"
              value={component.width}
              onChange={(e) =>
                handleChange({ width: parseInt(e.target.value) || 0 })
              }
              onKeyDown={(e) =>
                e.key === "Enter" && (e.target as HTMLInputElement).blur()
              }
              sx={{ width: 100 }}
            />
            <TextField
              label="Height"
              type="number"
              size="small"
              variant="outlined"
              value={component.height}
              onChange={(e) =>
                handleChange({ height: parseInt(e.target.value) || 0 })
              }
              onKeyDown={(e) =>
                e.key === "Enter" && (e.target as HTMLInputElement).blur()
              }
              sx={{ width: 100 }}
            />
            <TextField
              label="Z-Index"
              type="number"
              size="small"
              variant="outlined"
              value={component.zIndex}
              onChange={(e) =>
                handleChange({
                  zIndex: Math.max(1, parseInt(e.target.value) || 0),
                })
              }
              onKeyDown={(e) =>
                e.key === "Enter" && (e.target as HTMLInputElement).blur()
              }
              sx={{ width: 100 }}
            />
            <ColorPicker
              value={component.style?.fillColor ?? "#000000"}
              onChange={(color: string) =>
                handleStyleChange("fillColor", color)
              }
            />
            <IconButton
              color="error"
              tooltipTitle="Delete"
              onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
          </TextEditorContainer>
        )}

        <svg
          width="100%"
          height="100%"
          viewBox="0 0 32 26.4"
          preserveAspectRatio="none"
        >
          <path
            d="M23.6,0c-3.4,0-6.4,2.1-7.6,5.1C14.8,2.1,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4
              c0,4.5,3.5,8.2,10.3,13.8c1.6,1.3,3.4,2.7,5.3,4.2c1.9-1.5,3.7-2.9,5.3-4.2
              C28.5,16.6,32,12.9,32,8.4C32,3.8,28.2,0,23.6,0z"
            fill={component.style?.fillColor ?? "#000000"}
          />
        </svg>
      </Box>

      {selectedId === id && (
        <Moveable
          ref={moveableRef}
          target={targetRef}
          origin={false}
          draggable
          resizable
          rotatable
          throttleDrag={1}
          throttleResize={1}
          throttleRotate={0}
          rotationPosition="bottom"
          renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
          onDragStart={({ inputEvent }) => {
            const target = inputEvent?.target as HTMLElement;
            if (target.closest(".text-editor-container")) {
              inputEvent.stopPropagation();
              return false;
            }
          }}
          onDrag={({ beforeTranslate }) => {
            const el = targetRef.current;
            const bounds = boundsRef.current?.getBoundingClientRect();
            const comp = el?.getBoundingClientRect();
            if (!el || !bounds || !comp) return;

            const [x, y] = beforeTranslate;
            const maxX = bounds.width - comp.width;
            const maxY = bounds.height - comp.height;
            const clampedX = Math.max(0, Math.min(x, maxX));
            const clampedY = Math.max(0, Math.min(y, maxY));

            el.style.transform = getTransform(
              clampedX,
              clampedY,
              component.rotation
            );

            handleChange({ x: clampedX, y: clampedY });
          }}
          onResize={({ width, height, drag }) => {
            const el = targetRef.current;
            const bounds = boundsRef.current?.getBoundingClientRect();
            if (!el || !bounds) return;

            let [x, y] = drag.beforeTranslate;

            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
            el.style.transform = getTransform(x, y, component.rotation);

            handleChange({ width, height, x, y });
          }}
          onRotate={({ beforeRotate, drag }) => {
            const el = targetRef.current;
            if (!el) return;

            const rotation = Math.round(beforeRotate);
            const [x, y] = drag.beforeTranslate;

            el.style.transform = getTransform(x, y, rotation);

            handleChange({ rotation, x, y });
          }}
        />
      )}
    </>
  );
};

export default HeartComponent;
