import { useRef, useState } from "react";
import { Box } from "@mui/material";
//components
import TextComponent from "../../../components/worksheet/TextComponent/TextComponent";
import ArrowComponent from "../../../components/worksheet/ShapeComponent/ArrowComponent";
import CrossComponent from "../../../components/worksheet/ShapeComponent/CrossComponent";
import DiamondComponent from "../../../components/worksheet/ShapeComponent/DiamondComponent";
import HeartComponent from "../../../components/worksheet/ShapeComponent/HeartComponent";
import PolygonComponent from "../../../components/worksheet/ShapeComponent/PolygonComponent";
import MessageComponent from "../../../components/worksheet/ShapeComponent/MessageComponent";
import PlusComponent from "../../../components/worksheet/ShapeComponent/PlusComponent";
import RectangleComponent from "../../../components/worksheet/ShapeComponent/RectangleComponent";
import SquareComponent from "../../../components/worksheet/ShapeComponent/SquareComponent";
import StarComponent from "../../../components/worksheet/ShapeComponent/StarComponent";
import TriangleComponent from "../../../components/worksheet/ShapeComponent/TriangleComponent";
import CircleComponent from "../../../components/worksheet/ShapeComponent/CircleComponent";
import VideoComponent from "../../../components/worksheet/MediaComponent/VideoComponent";
import ImageComponent from "../../../components/worksheet/MediaComponent/ImageComponent";

const TestPage = () => {
  const workspaceRef = useRef<HTMLElement | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <Box
      ref={workspaceRef}
      position="relative"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
      overflow="hidden"
    >
      <TextComponent
        id={1}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        boundsRef={workspaceRef}
      />
    </Box>
  );
};

export default TestPage;
