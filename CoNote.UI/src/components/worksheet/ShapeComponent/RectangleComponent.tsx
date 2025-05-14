import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import Moveable from "react-moveable";
import { TextField, Box } from "@mui/material";
import ColorPicker from "../../ui/ColorPicker";
import TextEditorContainer from "../TextEditorContainer";
import { getTransform } from "../../../utils/getTransform";

type RectangleComponentProps = {
  id: number;
  selectedId: number | null;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
  boundsRef: React.RefObject<HTMLElement | null>;
};

const RectangleComponent = ({
  id,
  selectedId,
  setSelectedId,
  boundsRef,
}: RectangleComponentProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const moveableRef = useRef<Moveable>(null);

  const [properties, setProperties] = useState({
    width: 150,
    height: 100,
    x: 100,
    y: 100,
    rotation: 0,
    fillColor: "#90caf9",
    zIndex: 1,
  });

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
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, [selectedId, id, setSelectedId]);

  useLayoutEffect(() => {
    if (selectedId === id) {
      moveableRef.current?.updateRect();
    }
  }, [properties.width, properties.height]);

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
              variant="outlined"
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
              variant="outlined"
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
              label="Z-Index"
              type="number"
              size="small"
              variant="outlined"
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
              value={properties.fillColor}
              onChange={(color: string) => handleChange("fillColor", color)}
            />
          </TextEditorContainer>
        )}

        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${properties.width} ${properties.height}`}
          preserveAspectRatio="none"
        >
          <rect
            x="0"
            y="0"
            width={properties.width}
            height={properties.height}
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

export default RectangleComponent;
