import { Box, styled } from "@mui/material";

const WorksheetDroppableContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    boxSizing: "border-box",
    boxShadow: theme.shadows[3]
}));

const WorksheetDroppable = () => {
  return <WorksheetDroppableContainer>WorksheetDroppable</WorksheetDroppableContainer>;
};

export default WorksheetDroppable;
