import React, { useRef, useState, useEffect } from "react";
import Moveable from "react-moveable";
import { TextField, Box } from "@mui/material";
import ColorPicker from "../../ui/ColorPicker";
import TextEditorContainer from "../TextEditorContainer";

type SquareComponentProps = {
  id: number;
  selectedId: number | null;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
  boundsRef: React.RefObject<HTMLElement | null>;
  initialColor?: string;
  zIndex?: number;
};

const SquareComponent = ({
  id,
  selectedId,
  setSelectedId,
  boundsRef,
  initialColor = "#90caf9",
  zIndex = 1,
}: SquareComponentProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const moveableRef = useRef<Moveable>(null);

  const [frame, setFrame] = useState({
    transform: "translate(100px, 100px) rotate(0deg)",
    width: 100,
    height: 100,
  });

  const [fillColor, setFillColor] = useState(initialColor);
  const [currentZIndex, setCurrentZIndex] = useState(zIndex);

  const handleChangeFillColor = (color: string) => {
    setFillColor(color);
  };

  const handleChangeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value);
    if (!isNaN(newWidth)) {
      setFrame((prev) => ({
        ...prev,
        width: newWidth,
        height: newWidth,
      }));
    }
  };

  const handleChangeZIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newZIndex = parseInt(e.target.value);
    if (!isNaN(newZIndex)) {
      setCurrentZIndex(newZIndex);
    }
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

  const handleClick = () => {
    setSelectedId(id);
  };

  return (
    <>
      <Box
        ref={targetRef}
        onClick={handleClick}
        style={{
          position: "absolute",
          width: `${frame.width}px`,
          height: `${frame.height}px`,
          transform: frame.transform,
          zIndex: currentZIndex,
        }}
      >
        {selectedId === id && (
          <TextEditorContainer>
            <TextField
              label="Size"
              type="number"
              size="small"
              variant="outlined"
              value={frame.width}
              onChange={handleChangeWidth}
              fullWidth
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  (e.target as HTMLInputElement).blur();
                }
              }}
              sx={{ width: 100 }}
            />

            <TextField
              label="Z-Index"
              type="number"
              size="small"
              variant="outlined"
              value={currentZIndex}
              onChange={handleChangeZIndex}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  (e.target as HTMLInputElement).blur();
                }
              }}
              sx={{ width: 100 }}
            />

            <ColorPicker value={fillColor} onChange={handleChangeFillColor} />
          </TextEditorContainer>
        )}

        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            zIndex: currentZIndex,
          }}
        >
          <rect
            x="0"
            y="0"
            width={frame.width}
            height={frame.height}
            fill={fillColor}
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
          renderDirections={["nw", "ne", "sw", "se"]}
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

            el.style.transform = `translate(${clampedX}px, ${clampedY}px)`;

            setFrame((prev) => ({
              ...prev,
              transform: el.style.transform,
            }));
          }}
          onResize={({ width, height, drag, direction, delta }) => {
            const el = targetRef.current;
            const bounds = boundsRef.current?.getBoundingClientRect();
            if (!el || !bounds) return;

            let [x, y] = drag.beforeTranslate;
            const compRect = el.getBoundingClientRect();

            if (width !== height) {
              const minDimension = Math.min(width, height);
              width = height = minDimension;
            }

            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
            el.style.transform = `translate(${x}px, ${y}px)`;

            setFrame({
              width,
              height,
              transform: el.style.transform,
            });
          }}
          onRotate={({ drag }) => {
            const el = targetRef.current;
            if (!el) return;

            el.style.transform = drag.transform;

            setFrame((prev) => ({
              ...prev,
              transform: el.style.transform,
            }));
          }}
        />
      )}
    </>
  );
};

export default SquareComponent;
