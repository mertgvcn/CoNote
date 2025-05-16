import { useRef, useState } from "react";
//dnd
import { useDroppable } from "@dnd-kit/core";
//models
import { ComponentView } from "../../../../models/views/ComponentView";
import { ComponentType } from "../../../../models/enums/ComponentType";
//icons
import FileDownloadIcon from "@mui/icons-material/FileDownload";
//droppable components
import TextComponent from "../../../../components/worksheet/TextComponent/TextComponent";
import ImageComponent from "../../../../components/worksheet/MediaComponent/ImageComponent";
import VideoComponent from "../../../../components/worksheet/MediaComponent/VideoComponent";
import ArrowComponent from "../../../../components/worksheet/ShapeComponent/ArrowComponent";
import CircleComponent from "../../../../components/worksheet/ShapeComponent/CircleComponent";
import CrossComponent from "../../../../components/worksheet/ShapeComponent/CrossComponent";
import DiamondComponent from "../../../../components/worksheet/ShapeComponent/DiamondComponent";
import HeartComponent from "../../../../components/worksheet/ShapeComponent/HeartComponent";
import MessageComponent from "../../../../components/worksheet/ShapeComponent/MessageComponent";
import PlusComponent from "../../../../components/worksheet/ShapeComponent/PlusComponent";
import PolygonComponent from "../../../../components/worksheet/ShapeComponent/PolygonComponent";
import RectangleComponent from "../../../../components/worksheet/ShapeComponent/RectangleComponent";
import SquareComponent from "../../../../components/worksheet/ShapeComponent/SquareComponent";
import StarComponent from "../../../../components/worksheet/ShapeComponent/StarComponent";
import TriangleComponent from "../../../../components/worksheet/ShapeComponent/TriangleComponent";
//components
import { Box, Stack, styled, Typography, useTheme } from "@mui/material";

const WorksheetDroppableContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

type WorksheetDroppablePropsType = {
  components: ComponentView[];
};

const WorksheetDroppable = ({ components }: WorksheetDroppablePropsType) => {
  const { isOver, setNodeRef } = useDroppable({ id: "worksheet-dropzone" });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const boundsRef = useRef<HTMLDivElement | null>(null);

  const theme = useTheme();
  const style = {
    border: isOver ? `2px dashed ${theme.palette.primary.main}` : undefined,
  };

  const renderComponents = (component: any, index: number) => {
    switch (component.type) {
      case ComponentType.Text:
        return (
          <TextComponent
            key={index}
            id={index}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            boundsRef={boundsRef}
            initialProperties={component}
          />
        );
      case ComponentType.Image:
        return (
          <ImageComponent
            key={index}
            id={index}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            boundsRef={boundsRef}
            initialProperties={component}
          />
        );
      case ComponentType.Video:
        return (
          <VideoComponent
            key={index}
            id={index}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            boundsRef={boundsRef}
            initialProperties={component}
          />
        );
      case ComponentType.Arrow:
        return (
          <ArrowComponent
            key={index}
            id={index}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            boundsRef={boundsRef}
            initialProperties={component}
          />
        );
      case ComponentType.Circle:
        return (
          <CircleComponent
            key={index}
            id={index}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            boundsRef={boundsRef}
            initialProperties={component}
          />
        );
      case ComponentType.Cross:
        return (
          <CrossComponent
            key={index}
            id={index}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            boundsRef={boundsRef}
            initialProperties={component}
          />
        );
      case ComponentType.Diamond:
        return (
          <DiamondComponent
            key={index}
            id={index}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            boundsRef={boundsRef}
            initialProperties={component}
          />
        );
      case ComponentType.Heart:
        return (
          <HeartComponent
            key={index}
            id={index}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            boundsRef={boundsRef}
            initialProperties={component}
          />
        );
      case ComponentType.Message:
        return (
          <MessageComponent
            key={index}
            id={index}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            boundsRef={boundsRef}
            initialProperties={component}
          />
        );
      case ComponentType.Plus:
        return (
          <PlusComponent
            key={index}
            id={index}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            boundsRef={boundsRef}
            initialProperties={component}
          />
        );
      case ComponentType.Polygon:
        return (
          <PolygonComponent
            key={index}
            id={index}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            boundsRef={boundsRef}
            initialProperties={component}
          />
        );
      case ComponentType.Rectangle:
        return (
          <RectangleComponent
            key={index}
            id={index}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            boundsRef={boundsRef}
            initialProperties={component}
          />
        );
      case ComponentType.Square:
        return (
          <SquareComponent
            key={index}
            id={index}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            boundsRef={boundsRef}
            initialProperties={component}
          />
        );
      case ComponentType.Star:
        return (
          <StarComponent
            key={index}
            id={index}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            boundsRef={boundsRef}
            initialProperties={component}
          />
        );
      case ComponentType.Triangle:
        return (
          <TriangleComponent
            key={index}
            id={index}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            boundsRef={boundsRef}
            initialProperties={component}
          />
        );
      default:
        return null;
    }
  };

  return (
    <WorksheetDroppableContainer
      ref={(node: any) => {
        setNodeRef(node);
        boundsRef.current = node;
      }}
      sx={style}
    >
      {components.length === 0 ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ width: "100%", height: "100%" }}
        >
          <Stack
            direction="column"
            gap={1}
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="subtitle1" color={isOver ? "primary" : "secondary"}>
              Drop here
            </Typography>
            <FileDownloadIcon fontSize="large" color={isOver ? "primary" : "secondary"} />
          </Stack>
        </Box>
      ) : (
        components.map((component: any, index: number) =>
          renderComponents(component, index)
        )
      )}
    </WorksheetDroppableContainer>
  );
};

export default WorksheetDroppable;
