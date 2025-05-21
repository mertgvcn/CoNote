import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
//redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { deleteComponent } from "../../../features/component/slices/componentSlice";
//moveable
import Moveable from "react-moveable";
//utils
import { getTransform } from "../../../utils/getTransform";
//models
import { ComponentView } from "../../../models/views/ComponentView";
//icons
import DeleteIcon from "@mui/icons-material/Delete";
//components
import { TextField, Box } from "@mui/material";
import ColorPicker from "../../ui/ColorPicker";
import TextEditorContainer from "../TextEditorContainer";
import IconButton from "../../ui/IconButton";

type PolygonComponentProps = {
  id: number;
  selectedId: number | null;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
  boundsRef: React.RefObject<HTMLElement | null>;
  initialProperties: ComponentView;
};

const PolygonComponent = ({
  id,
  selectedId,
  setSelectedId,
  boundsRef,
  initialProperties,
}: PolygonComponentProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const moveableRef = useRef<Moveable>(null);
  const dispatch = useDispatch<AppDispatch>();

  const [properties, setProperties] = useState({
    width: initialProperties.width,
    height: initialProperties.height,
    x: initialProperties.x,
    y: initialProperties.y,
    rotation: initialProperties.rotation,
    zIndex: initialProperties.zIndex,
    fillColor: initialProperties.style?.fillColor,
    sides: initialProperties.style?.sides,
  });

  useEffect(() => {
    if (selectedId !== id) return;
    const handleClickOutside = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      const isInside = targetRef.current?.contains(target);
      const isMoveable = !!target.closest(".moveable-control-box");
      if (!isInside && !isMoveable) {
        setSelectedId(null);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [selectedId, id, setSelectedId]);

  useLayoutEffect(() => {
    if (selectedId === id) {
      moveableRef.current?.updateRect();
    }
  }, [properties.width, properties.height]);

  const handleClick = () => {
    setSelectedId(id);
  };

  const handleChange = <K extends keyof typeof properties>(
    key: K,
    value: (typeof properties)[K]
  ) => {
    setProperties((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDelete = async () => {
    await dispatch(deleteComponent(initialProperties.id));
  };

  function getPolygonPoints(sides: number, boxSize = 100): string {
    const center = boxSize / 2;
    const radius = center;
    const angleStep = (2 * Math.PI) / sides;

    return Array.from({ length: sides }, (_, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return `${x},${y}`;
    }).join(" ");
  }

  return (
    <>
      <Box
        ref={targetRef}
        onClick={handleClick}
        style={{
          position: "absolute",
          width: `${properties.width}px`,
          height: `${properties.height}px`,
          transform: getTransform(
            properties.x,
            properties.y,
            properties.rotation
          ),
          zIndex: properties.zIndex,
          cursor: "move",
        }}
      >
        {selectedId === id && (
          <TextEditorContainer>
            <TextField
              label="Width"
              type="number"
              size="small"
              value={properties.width}
              onChange={(e) =>
                handleChange("width", parseInt(e.target.value) || 0)
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
              value={properties.height}
              onChange={(e) =>
                handleChange("height", parseInt(e.target.value) || 0)
              }
              onKeyDown={(e) =>
                e.key === "Enter" && (e.target as HTMLInputElement).blur()
              }
              sx={{ width: 100 }}
            />

            <TextField
              label="Sides"
              type="number"
              size="small"
              value={properties.sides}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) {
                  handleChange("sides", Math.max(5, Math.min(10, value)));
                }
              }}
              inputProps={{ min: 5, max: 10 }}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.target as HTMLInputElement).blur()
              }
              sx={{ width: 100 }}
            />

            <TextField
              label="Z-Index"
              type="number"
              size="small"
              value={properties.zIndex}
              onChange={(e) =>
                handleChange("zIndex", Math.max(1, parseInt(e.target.value)))
              }
              onKeyDown={(e) =>
                e.key === "Enter" && (e.target as HTMLInputElement).blur()
              }
              sx={{ width: 100 }}
            />

            <ColorPicker
              value={properties.fillColor!}
              onChange={(color: string) => handleChange("fillColor", color)}
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
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polygon
            points={getPolygonPoints(properties.sides!)}
            fill={properties.fillColor}
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
          throttleRotate={1}
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
              properties.rotation
            );

            setProperties((prev) => ({
              ...prev,
              x: clampedX,
              y: clampedY,
            }));
          }}
          onResize={({ width, height, drag }) => {
            const el = targetRef.current;
            const bounds = boundsRef.current?.getBoundingClientRect();
            if (!el || !bounds) return;

            let [x, y] = drag.beforeTranslate;
            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
            el.style.transform = getTransform(x, y, properties.rotation);

            setProperties((prev) => ({
              ...prev,
              width,
              height,
              x,
              y,
            }));
          }}
          onRotate={({ beforeRotate, drag }) => {
            const el = targetRef.current;
            if (!el) return;

            const rotation = beforeRotate;
            const [x, y] = drag.beforeTranslate;

            el.style.transform = getTransform(x, y, rotation);

            setProperties((prev) => ({
              ...prev,
              x,
              y,
              rotation,
            }));
          }}
        />
      )}
    </>
  );
};

export default PolygonComponent;
