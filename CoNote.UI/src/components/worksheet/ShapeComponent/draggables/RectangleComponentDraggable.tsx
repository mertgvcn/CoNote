import { useDraggable } from "@dnd-kit/core";
//models
import { ComponentType } from "../../../../models/enums/ComponentType";
//components
import { Box } from "@mui/material";

const RectangleComponentDraggable = () => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: ComponentType.Rectangle,
    data: { type: ComponentType.Rectangle },
  });

  const style = {
    cursor: "grab",
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    "&:active": {
      cursor: "grabbing",
    },
  };

  return (
    <Box ref={setNodeRef} {...listeners} {...attributes} sx={style}>
      <Box sx={{ width: 112.5, height: 75 }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 150 100"
          preserveAspectRatio="none"
        >
          <rect x="0" y="0" width="150" height="100" fill="#90caf9" />
        </svg>
      </Box>
    </Box>
  );
};

export default RectangleComponentDraggable;
