import { useDraggable } from "@dnd-kit/core";
//models
import { ComponentType } from "../../../../models/enums/ComponentType";
//components
import { Box } from "@mui/material";

const CrossComponentDraggable = () => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: ComponentType.Cross,
    data: { type: ComponentType.Cross },
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
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M10,0 L50,40 L90,0 L100,10 L60,50
           L100,90 L90,100 L50,60 L10,100 L0,90
           L40,50 L0,10 Z"
            fill="#7e57c2"
          />
        </svg>
      </Box>
    </Box>
  );
};

export default CrossComponentDraggable;
