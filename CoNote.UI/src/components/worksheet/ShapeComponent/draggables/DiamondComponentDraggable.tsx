import { useDraggable } from "@dnd-kit/core";
//models
import { ComponentType } from "../../../../models/enums/ComponentType";
//components
import { Box } from "@mui/material";

const DiamondComponentDraggable = () => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: ComponentType.Diamond,
    data: { type: ComponentType.Diamond },
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
          <path d="M50,0 L100,50 L50,100 L0,50 Z" fill="#4fc3f7" />
        </svg>
      </Box>
    </Box>
  );
};

export default DiamondComponentDraggable;
