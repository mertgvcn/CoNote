//redux
import { useSelector } from "react-redux";
import { selectWorksheetSettings } from "../../../../features/worksheet/slices/worksheetSlice";
//icons
import SettingsIcon from "@mui/icons-material/Settings";
//models
import { PermissionAction } from "../../../../models/enums/PermissionAction";
import { PermissionObjectType } from "../../../../models/enums/PermissionObjectType";
//draggable components
import TextComponentDraggable from "../../../../components/worksheet/TextComponent/draggables/TextComponentDraggable";
import ImageComponentDraggable from "../../../../components/worksheet/MediaComponent/draggables/ImageComponentDraggable";
import VideoComponentDraggable from "../../../../components/worksheet/MediaComponent/draggables/VideoComponentDraggable";
import ArrowComponentDraggable from "../../../../components/worksheet/ShapeComponent/draggables/ArrowComponentDraggable";
import CircleComponentDraggable from "../../../../components/worksheet/ShapeComponent/draggables/CircleComponentDraggable";
import CrossComponentDraggable from "../../../../components/worksheet/ShapeComponent/draggables/CrossComponentDraggable";
import DiamondComponentDraggable from "../../../../components/worksheet/ShapeComponent/draggables/DiamondComponentDraggable";
import HeartComponentDraggable from "../../../../components/worksheet/ShapeComponent/draggables/HeartComponentDraggable";
import MessageComponentDraggable from "../../../../components/worksheet/ShapeComponent/draggables/MessageComponentDraggable";
import PlusComponentDraggable from "../../../../components/worksheet/ShapeComponent/draggables/PlusComponentDraggable";
import PolygonComponentDraggable from "../../../../components/worksheet/ShapeComponent/draggables/PolygonComponentDraggable";
import RectangleComponentDraggable from "../../../../components/worksheet/ShapeComponent/draggables/RectangleComponentDraggable";
import SquareComponentDraggable from "../../../../components/worksheet/ShapeComponent/draggables/SquareComponentDraggable";
import StarComponentDraggable from "../../../../components/worksheet/ShapeComponent/draggables/StarComponentDraggable";
import TriangleComponentDraggable from "../../../../components/worksheet/ShapeComponent/draggables/TriangleComponentDraggable";
//components
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import PermissionGate from "../../../../components/ui/PermissionGate";

const WorksheetPanelContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  minWidth: 300,
  width: 300,
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
          {worksheet?.name || "MyWorksheet"}
        </Typography>

        <PermissionGate
          action={PermissionAction.Edit}
          objectType={PermissionObjectType.Worksheet}
        >
          <IconButton color="secondary" size="small">
            <SettingsIcon />
          </IconButton>
        </PermissionGate>
      </Stack>

      <Divider />

      <Stack direction="column" gap={1}>
        <Typography variant="subtitle2">Text</Typography>
        <TextComponentDraggable />
      </Stack>

      <Stack direction="column" gap={1}>
        <Typography variant="subtitle2">Media</Typography>
        <Grid container spacing={2}>
          <Grid
            size={{ sm: 4.5 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ImageComponentDraggable />
          </Grid>
          <Grid
            size={{ sm: 7.5 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <VideoComponentDraggable />
          </Grid>
        </Grid>
      </Stack>

      <Stack direction="column" gap={1}>
        <Typography variant="subtitle2">Shapes</Typography>
        <Grid container spacing={2}>
          <Grid
            size={{ sm: 3 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowComponentDraggable />
          </Grid>
          <Grid
            size={{ sm: 3 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircleComponentDraggable />
          </Grid>
          <Grid
            size={{ sm: 3 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CrossComponentDraggable />
          </Grid>
          <Grid
            size={{ sm: 3 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DiamondComponentDraggable />
          </Grid>
          <Grid
            size={{ sm: 3 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HeartComponentDraggable />
          </Grid>
          <Grid
            size={{ sm: 3 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MessageComponentDraggable />
          </Grid>
          <Grid
            size={{ sm: 3 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PlusComponentDraggable />
          </Grid>
          <Grid
            size={{ sm: 3 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PolygonComponentDraggable />
          </Grid>
          <Grid
            size={{ sm: 3 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RectangleComponentDraggable />
          </Grid>
          <Grid
            size={{ sm: 3 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SquareComponentDraggable />
          </Grid>
          <Grid
            size={{ sm: 3 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StarComponentDraggable />
          </Grid>
          <Grid
            size={{ sm: 3 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TriangleComponentDraggable />
          </Grid>
        </Grid>
      </Stack>
    </WorksheetPanelContainer>
  );
};

export default WorksheetPanel;
