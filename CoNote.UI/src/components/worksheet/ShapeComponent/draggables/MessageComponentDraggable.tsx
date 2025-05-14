import { useDraggable } from "@dnd-kit/core";
//models
import { ComponentType } from "../../../../models/enums/ComponentType";
//components
import { Box } from "@mui/material";

const MessageComponentDraggable = () => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: ComponentType.Message,
    data: { type: ComponentType.Message },
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
          viewBox="10 10 80 80"
          preserveAspectRatio="none"
        >
          <path d="M10,10 H90 V70 H75 L70,90 L65,70 H10 Z" fill="#AED581" />
        </svg>
      </Box>
    </Box>
  );
};

export default MessageComponentDraggable;
