import { useDraggable } from "@dnd-kit/core";
//models
import { ComponentType } from "../../../../models/enums/ComponentType";
//components
import { Box } from "@mui/material";

const ImageComponentDraggable = () => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: ComponentType.Image,
    data: { type: ComponentType.Image },
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
      <Box sx={{ width: 106, height: 100 }}>
        <img
          src={require(`../../../../assets/images/placeholders/image-component-placeholder.png`)}
          alt="Image preview"
          width="100%"
          height="100%"
          style={{ objectFit: "fill" }}
        />
      </Box>
    </Box>
  );
};

export default ImageComponentDraggable;
