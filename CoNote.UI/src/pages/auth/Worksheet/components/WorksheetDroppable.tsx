import { Box, Typography, styled } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";


const WorksheetDroppableContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  position: "relative",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: 0,
  boxSizing: "border-box",
  boxShadow: theme.shadows[3],
  overflow: "hidden",
  border: "2px dashed #90caf9",
}));

const DroppedItemBox = styled(Box)({
  position: "absolute",
  border: "1px solid #ccc",
  borderRadius: 4,
  padding: 8,
  backgroundColor: "#e0f7fa",
  minWidth: 100,
  minHeight: 40,
});

const WorksheetDroppable = ({ droppedItems = [] }: { droppedItems?: any[] }) => {
  const { setNodeRef } = useDroppable({ id: "worksheet-dropzone" });

  return (
    <WorksheetDroppableContainer id="worksheet-dropzone" ref={setNodeRef}>
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
