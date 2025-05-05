import { Box, styled } from "@mui/material";
import React from "react";

const WorksheetPanelContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: 240,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  userSelect: "none"
}));

const WorksheetPanel = () => {
  return <WorksheetPanelContainer>WorksheetPanel</WorksheetPanelContainer>;
};

export default WorksheetPanel;
