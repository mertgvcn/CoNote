import { useDraggable } from "@dnd-kit/core";
//models
import { ComponentType } from "../../../../models/enums/ComponentType";
//components
import { Box } from "@mui/material";

const ArrowComponentDraggable = () => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: ComponentType.Arrow,
    data: { type: ComponentType.Arrow },
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
      <Box sx={{ width: "100%", height: "100%" }}>
        <svg
          width="100%"
          height="100%"
          viewBox="10 20 180 60"
          preserveAspectRatio="none"
        >
          <path
            d="M10,40 L130,40 L130,20 L190,50 L130,80 L130,60 L10,60 Z"
            fill="#64b5f6"
          />
        </svg>
      </Box>
    </Box>
  );
};

export default ArrowComponentDraggable;
