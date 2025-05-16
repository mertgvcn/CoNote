//redux
import { useSelector } from "react-redux";
import { selectWorksheetSettings } from "../../../../features/worksheet/slices/worksheetSlice";
//icons
import SettingsIcon from "@mui/icons-material/Settings";
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
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Carousel from "../../../../components/ui/Carousel/Carousel";

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
        <IconButton color="secondary" size="small">
          <SettingsIcon />
        </IconButton>
      </Stack>

      <Divider />

      <Stack direction="column" gap={1}>
        <Typography variant="subtitle2">Text</Typography>
        <TextComponentDraggable />
      </Stack>

      <Stack direction="column" gap={1}>
        <Typography variant="subtitle2">Media</Typography>
        <Carousel>
          <ImageComponentDraggable />
          <VideoComponentDraggable />
        </Carousel>
      </Stack>

      <Stack direction="column" gap={1}>
        <Typography variant="subtitle2">Shape</Typography>
        <Carousel>
          <ArrowComponentDraggable />
          <CircleComponentDraggable />
          <CrossComponentDraggable />
          <DiamondComponentDraggable />
          <HeartComponentDraggable />
          <MessageComponentDraggable />
          <PlusComponentDraggable />
          <PolygonComponentDraggable />
          <RectangleComponentDraggable />
          <SquareComponentDraggable />
          <StarComponentDraggable />
          <TriangleComponentDraggable />
        </Carousel>
      </Stack>
    </WorksheetPanelContainer>
  );
};

export default WorksheetPanel;
