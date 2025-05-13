import { useRef, useState } from "react";
import { Box } from "@mui/material";
//components
import TextComponent from "../../../components/worksheet/TextComponent/TextComponent";
import ArrowComponent from "../../../components/worksheet/ShapeComponent/ArrowComponent";
import CrossComponent from "../../../components/worksheet/ShapeComponent/CrossComponent";
import DiamondComponent from "../../../components/worksheet/ShapeComponent/DiamondComponent";
import DonutComponent from "../../../components/worksheet/ShapeComponent/DonutComponent";
import HeartComponent from "../../../components/worksheet/ShapeComponent/HeartComponent";
import PolygonComponent from "../../../components/worksheet/ShapeComponent/PolygonComponent";
import MessageComponent from "../../../components/worksheet/ShapeComponent/MessageComponent";
import PlusComponent from "../../../components/worksheet/ShapeComponent/PlusComponent";
import RectangleComponent from "../../../components/worksheet/ShapeComponent/RectangleComponent";
import SquareComponent from "../../../components/worksheet/ShapeComponent/SquareComponent";
import StarComponent from "../../../components/worksheet/ShapeComponent/StarComponent";
import TriangleComponent from "../../../components/worksheet/ShapeComponent/TriangleComponent";

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
        <SquareComponent
        id={2}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        boundsRef={workspaceRef}
        initialColor="#7e57c2"
      />
      <TextComponent
        id={4}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        boundsRef={workspaceRef}
      />
    </Box>
  );
};

export default TestPage;
