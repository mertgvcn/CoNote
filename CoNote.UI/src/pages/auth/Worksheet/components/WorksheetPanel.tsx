//redux
import { useSelector } from "react-redux";
import { selectWorksheetSettings } from "../../../../features/worksheet/slices/worksheetSlice";
//icons
import SettingsIcon from "@mui/icons-material/Settings";
//components
import {
  Box,
  Divider,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";

const WorksheetPanelContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  minWidth: 240,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  padding: theme.spacing(2),
  boxSizing: "border-box",
  userSelect: "none",
  gap: theme.spacing(2),
}));

const WorksheetPanel = () => {
  const worksheet = useSelector(selectWorksheetSettings);
  return (
    <WorksheetPanelContainer>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <Typography variant="h6" fontWeight={500}>
          {worksheet?.name}
        </Typography>
        <IconButton color="secondary" size="small">
          <SettingsIcon />
        </IconButton>
      </Stack>

    </WorksheetPanelContainer>
  );
};

export default WorksheetPanel;
