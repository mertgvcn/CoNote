//dnd
import { useDroppable } from "@dnd-kit/core";
//components
import { Box, Typography, styled, useTheme } from "@mui/material";

const WorksheetDroppableContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  position: "relative",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  overflow: "hidden",
}));

const DroppedItemBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  border: "1px solid #ccc",
  borderRadius: 4,
  padding: 8,
  backgroundColor: "#e0f7fa",
  minWidth: 100,
  minHeight: 40,
}));

const WorksheetDroppable = ({
  droppedItems = [],
}: {
  droppedItems?: any[];
}) => {
  const { isOver, setNodeRef } = useDroppable({ id: "worksheet-dropzone" });

  const theme = useTheme();
  const style = {
    border: isOver ? `2px dashed ${theme.palette.primary.main}` : undefined,
  };

  return (
    <WorksheetDroppableContainer id="worksheet-dropzone" ref={setNodeRef} sx={style}>
      {droppedItems.length === 0 && (
        <Typography
          color="text.secondary"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Drop...
        </Typography>
      )}

      {droppedItems.map((item, index) => (
        <DroppedItemBox
          key={`${item.id}-${index}`}
          sx={{
            left: item.x,
            top: item.y,
          }}
        >
          <Typography variant="body2">{item.name}</Typography>
        </DroppedItemBox>
      ))}
    </WorksheetDroppableContainer>
  );
};

export default WorksheetDroppable;
