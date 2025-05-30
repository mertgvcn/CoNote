import { useDraggable } from "@dnd-kit/core";
//models
import { ComponentType } from "../../../../models/enums/ComponentType";
//components
import { Box } from "@mui/material";

const ID = ComponentType.Heart
const WIDTH = 75
const HEIGHT = 75
const TYPE = ComponentType.Heart
const FILL_COLOR = "#e91e63"

const HeartComponentDraggable = () => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: ID,
    data: { id: ID, width: WIDTH, height: HEIGHT, type: TYPE, fillColor: FILL_COLOR },
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
          viewBox="0 0 32 26.4"
          preserveAspectRatio="none"
        >
          <path
            d="M23.6,0c-3.4,0-6.4,2.1-7.6,5.1C14.8,2.1,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4
          c0,4.5,3.5,8.2,10.3,13.8c1.6,1.3,3.4,2.7,5.3,4.2c1.9-1.5,3.7-2.9,5.3-4.2
          C28.5,16.6,32,12.9,32,8.4C32,3.8,28.2,0,23.6,0z"
            fill={FILL_COLOR}
          />
        </svg>
      </Box>
    </Box>
  );
};

export default HeartComponentDraggable;
