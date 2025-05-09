// redux
import { useSelector } from "react-redux";
import { selectWorksheetSettings } from "../../../../features/worksheet/slices/worksheetSlice";
// icons
import SettingsIcon from "@mui/icons-material/Settings";
// dnd-kit
import { useDraggable } from "@dnd-kit/core";
// mui
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

const DraggableItem = ({ id, name }: { id: string; name: string }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data: { id, name },
  });

  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      sx={{
        border: "1px solid #ccc",
        padding: 1,
        borderRadius: 1,
        mb: 1,
        backgroundColor: "#f9f9f9",
        cursor: "grab",
        userSelect: "none",
        position: "relative",
        zIndex: 999,
        touchAction: "none", 
      }}
    >
      {name}
    </Box>
  );
};

const WorksheetPanel = () => {
  const worksheet = useSelector(selectWorksheetSettings);

  const components = [
    { id: "textField", name: "Text Field" },
    { id: "checkbox", name: "Checkbox" },
  ];

  return (
    <WorksheetPanelContainer>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <Typography variant="h6" fontWeight={500}>
          {worksheet?.name || "MyWorksheet"}
        </Typography>
        <IconButton color="secondary" size="small">
          <SettingsIcon />
        </IconButton>
      </Stack>

      <Divider />

      {components.map((comp, index) => (
        <DraggableItem
          key={`${comp.id}-${index}`}
          id={`${comp.id}-${index}`}
          name={comp.name}
        />
      ))}
    </WorksheetPanelContainer>
  );
};

export default WorksheetPanel;
  