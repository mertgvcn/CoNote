import { useDraggable } from "@dnd-kit/core";
//models
import { ComponentType } from "../../../../models/enums/ComponentType";
//components
import { Box } from "@mui/material";

const SquareComponentDraggable = () => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: ComponentType.Square,
    data: { type: ComponentType.Square },
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
      <Box sx={{ width: 75, height: 75 }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <rect x="0" y="0" width="100" height="100" fill="#DFB6FD" />
        </svg>
      </Box>
    </Box>
  );
};

export default SquareComponentDraggable;
