import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import Moveable from "react-moveable";
import { TextField, Box } from "@mui/material";
import ColorPicker from "../../ui/ColorPicker";
import TextEditorContainer from "../TextEditorContainer";

type SquareComponentProps = {
  id: number;
  selectedId: number | null;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
  boundsRef: React.RefObject<HTMLElement | null>;
};

const SquareComponent = ({
  id,
  selectedId,
  setSelectedId,
  boundsRef,
}: SquareComponentProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const moveableRef = useRef<Moveable>(null);

  const [properties, setProperties] = useState({
    width: 100,
    height: 100,
    transform: "translate(100px, 100px) rotate(0deg)",
    fillColor: "#DFB6FD",
    zIndex: 1,
  });

  const handleClick = () => {
    setSelectedId(id);
  };

  const handleChange = (key: keyof typeof properties, value: any) => {
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
          transform: properties.transform,
          zIndex: properties.zIndex,
          cursor: "move",
        }}
      >
        {selectedId === id && (
          <TextEditorContainer>
            <TextField
              label="Size"
              type="number"
              size="small"
              variant="outlined"
              value={properties.width}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) {
                  handleChange("width", value);
                  handleChange("height", value);
                }
              }}
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
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) {
                  handleChange("zIndex", Math.max(1, value));
                }
              }}
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
          renderDirections={["nw", "ne", "sw", "se"]}
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

            const transform = `translate(${clampedX}px, ${clampedY}px)`;
            el.style.transform = transform;

            setProperties((prev) => ({
              ...prev,
              transform,
            }));
          }}
          onResize={({ width, height, drag }) => {
            const el = targetRef.current;
            const bounds = boundsRef.current?.getBoundingClientRect();
            if (!el || !bounds) return;

            let [x, y] = drag.beforeTranslate;
            const size = Math.min(width, height);
            el.style.width = `${size}px`;
            el.style.height = `${size}px`;
            const transform = `translate(${x}px, ${y}px)`;
            el.style.transform = transform;

            setProperties((prev) => ({
              ...prev,
              width: size,
              height: size,
              transform,
            }));
          }}
          onRotate={({ drag }) => {
            const el = targetRef.current;
            if (!el) return;

            const transform = drag.transform;
            el.style.transform = transform;

            setProperties((prev) => ({
              ...prev,
              transform,
            }));
          }}
        />
      )}
    </>
  );
};

export default SquareComponent;
