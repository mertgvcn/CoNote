import React, { useRef, useState, useEffect } from "react";
import Moveable from "react-moveable";
import { TextField, Box } from "@mui/material";
import ColorPicker from "../../ui/ColorPicker";
import TextEditorContainer from "../TextEditorContainer";

type DonutComponentProps = {
  id: number;
  selectedId: number | null;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
  boundsRef: React.RefObject<HTMLElement | null>;
  initialColor?: string;
  zIndex?: number;
};

const DonutComponent = ({
  id,
  selectedId,
  setSelectedId,
  boundsRef,
  initialColor = "#ba68c8",
  zIndex = 1,
}: DonutComponentProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const moveableRef = useRef<Moveable>(null);

  const [frame, setFrame] = useState({
    transform: "translate(100px, 100px) rotate(0deg)",
    width: 150,
    height: 150,
  });

  const [fillColor, setFillColor] = useState(initialColor);

  const handleChangeFillColor = (color: string) => {
    setFillColor(color);
  };

  const handleChangeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value);
    if (!isNaN(newWidth)) {
      setFrame((prev) => ({
        ...prev,
        width: newWidth,
      }));
    }
  };

  const handleChangeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value);
    if (!isNaN(newHeight)) {
      setFrame((prev) => ({
        ...prev,
        height: newHeight,
      }));
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
          zIndex,
        }}
      >
        {selectedId === id && (
          <TextEditorContainer>
            <Box display="flex" alignItems="center" gap={1}>
              <TextField
                label="Width"
                type="number"
                size="small"
                variant="outlined"
                value={frame.width}
                onChange={handleChangeWidth}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    (e.target as HTMLInputElement).blur();
                  }
                }}
                sx={{ width: 100 }}
                inputProps={{
                  onPointerDown: (e) => e.stopPropagation(),
                }}
              />
              <TextField
                label="Height"
                type="number"
                size="small"
                variant="outlined"
                value={frame.height}
                onChange={handleChangeHeight}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    (e.target as HTMLInputElement).blur();
                    
                  }
                }}
                sx={{ width: 100 }}
                inputProps={{
                  onPointerDown: (e) => e.stopPropagation(),
                }}
              />
              <Box
                sx={{ display: "flex", alignItems: "center", height: "100%" }}
              >
                <ColorPicker
                  value={fillColor}
                  onChange={handleChangeFillColor}
                />
              </Box>
            </Box>
          </TextEditorContainer>
        )}

        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="
              M50,0
              A50,50 0 1,1 49.999,0
              M50,30
              A20,20 0 1,0 50.001,30
            "
            fill={fillColor}
            fillRule="evenodd"
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

            if (direction[0] === -1 && compRect.left + delta[0] < bounds.left)
              width = compRect.right - bounds.left;
            if (direction[1] === -1 && compRect.top + delta[1] < bounds.top)
              height = compRect.bottom - bounds.top;
            if (direction[0] === 1 && compRect.right + delta[0] > bounds.right)
              width = bounds.right - compRect.left;
            if (
              direction[1] === 1 &&
              compRect.bottom + delta[1] > bounds.bottom
            )
              height = bounds.bottom - compRect.top;

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

export default DonutComponent;
