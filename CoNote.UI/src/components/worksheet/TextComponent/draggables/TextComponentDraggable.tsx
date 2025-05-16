import { useDraggable } from "@dnd-kit/core";
//models
import { ComponentType } from "../../../../models/enums/ComponentType";
//components
import { Box, styled } from "@mui/material";

const TextComponentDraggableContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "100%",
  padding: `0px ${theme.spacing(2)}`,
  boxSizing: "border-box",
  border: `1px dashed ${theme.palette.divider}`
}));

const TextComponentDraggable = () => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: ComponentType.Text,
    data: { type: ComponentType.Text },
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
      <Box sx={{ width: 150, height: 35 }}>
        <TextComponentDraggableContainer>
          Edit this text
        </TextComponentDraggableContainer>
      </Box>
    </Box>
  );
};

export default TextComponentDraggable;
