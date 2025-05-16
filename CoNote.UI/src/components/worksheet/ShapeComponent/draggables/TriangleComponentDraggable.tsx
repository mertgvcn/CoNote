import { useDraggable } from "@dnd-kit/core";
//models
import { ComponentType } from "../../../../models/enums/ComponentType";
//components
import { Box } from "@mui/material";

const TriangleComponentDraggable = () => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: ComponentType.Triangle,
    data: { type: ComponentType.Triangle },
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
          <polygon points="50,0 100,100 0,100" fill="#a1887f" />
        </svg>
      </Box>
    </Box>
  );
};

export default TriangleComponentDraggable;
