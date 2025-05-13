import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import Moveable from "react-moveable";
import { TextField, Box } from "@mui/material";
import ColorPicker from "../../ui/ColorPicker";
import TextEditorContainer from "../TextEditorContainer";

type CircleComponentProps = {
  id: number;
  selectedId: number | null;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
  boundsRef: React.RefObject<HTMLElement | null>;
};

const CircleComponent = ({
  id,
  selectedId,
  setSelectedId,
  boundsRef,
}: CircleComponentProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const moveableRef = useRef<Moveable>(null);

  const [properties, setProperties] = useState({
    width: 150,
    height: 150,
    transform: "translate(100px, 100px) rotate(0deg)",
    fillColor: "#ba68c8",
    zIndex: 1,
    innerRadiusRatio: 0,
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

  const outerR = 50;
  const innerR = outerR * properties.innerRadiusRatio;

  const circlePath = `
    M50,0
    A${outerR},${outerR} 0 1,1 49.999,0
    M50,${50 - innerR}
    A${innerR},${innerR} 0 1,0 50.001,${50 - innerR}
  `;

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
              label="Width"
              type="number"
              size="small"
              variant="outlined"
              value={properties.width}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) handleChange("width", value);
              }}
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
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) handleChange("height", value);
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
                if (!isNaN(value)) handleChange("zIndex", Math.max(1, value));
              }}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.target as HTMLInputElement).blur()
              }
              sx={{ width: 100 }}
            />
            <TextField
              label="Hole Size"
              type="number"
              size="small"
              variant="outlined"
              value={properties.innerRadiusRatio}
              slotProps={{ htmlInput: { min: 0, max: 0.98, step: 0.02 } }}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value)) {
                  const clamped = Math.max(0, Math.min(value, 0.98));
                  handleChange("innerRadiusRatio", clamped);
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
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d={circlePath} fill={properties.fillColor} fillRule="evenodd" />
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
            const transform = `translate(${x}px, ${y}px)`;
            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
            el.style.transform = transform;

            setProperties((prev) => ({
              ...prev,
              width,
              height,
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

export default CircleComponent;
