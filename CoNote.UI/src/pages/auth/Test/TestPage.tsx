import { useRef, useState } from "react";
import { Box, Stack } from "@mui/material";
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
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  pointerWithin,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import CircleComponentDraggable from "../../../components/worksheet/ShapeComponent/draggables/CircleComponentDraggable";
import CrossComponentDraggable from "../../../components/worksheet/ShapeComponent/draggables/CrossComponentDraggable";
import DiamondComponentDraggable from "../../../components/worksheet/ShapeComponent/draggables/DiamondComponentDraggable";
import HeartComponentDraggable from "../../../components/worksheet/ShapeComponent/draggables/HeartComponentDraggable";
import MessageComponentDraggable from "../../../components/worksheet/ShapeComponent/draggables/MessageComponentDraggable";
import PlusComponentDraggable from "../../../components/worksheet/ShapeComponent/draggables/PlusComponentDraggable";
import PolygonComponentDraggable from "../../../components/worksheet/ShapeComponent/draggables/PolygonComponentDraggable";
import RectangleComponentDraggable from "../../../components/worksheet/ShapeComponent/draggables/RectangleComponentDraggable";
import SquareComponentDraggable from "../../../components/worksheet/ShapeComponent/draggables/SquareComponentDraggable";
import StarComponentDraggable from "../../../components/worksheet/ShapeComponent/draggables/StarComponentDraggable";
import TriangleComponentDraggable from "../../../components/worksheet/ShapeComponent/draggables/TriangleComponentDraggable";
import TextComponentDraggable from "../../../components/worksheet/TextComponent/draggables/TextComponentDraggable";
import ImageComponentDraggable from "../../../components/worksheet/MediaComponent/draggables/ImageComponentDraggable";
import VideoComponentDraggable from "../../../components/worksheet/MediaComponent/draggables/VideoComponentDraggable";
import { ComponentType } from "../../../models/enums/ComponentType";
import ArrowComponentDraggable from "../../../components/worksheet/ShapeComponent/draggables/ArrowComponentDraggable";
import { ComponentView } from "../../../models/views/ComponentView";
import { componentDefaults } from "../../../utils/ComponentDefaults";
import { CreateComponentRequest } from "../../../api/Component/models/CreateComponentRequest";
import { componentService } from "../../../features/component/componentService";

interface DroppedComponentData {
  type: ComponentType;
  [key: string]: any;
}

const Droppable = ({ components }: { components: ComponentView[] }) => {
  const { isOver, setNodeRef } = useDroppable({ id: "dropzone" });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const boundsRef = useRef<HTMLDivElement | null>(null);

  const style = {
    width: 500,
    height: 500,
    border: `3px dashed ${isOver ? "purple" : "black"}`,
  };

  const renderComponents = (component: any, index: number) => {
    if (component.type === ComponentType.Image) {
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
    } else if (component.type === ComponentType.Video) {
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
    } else if (component.type === ComponentType.Arrow) {
      return (
        <ArrowComponent
          key={index}
          id={index}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          boundsRef={boundsRef}
        />
      );
    } else if (component.type === ComponentType.Message) {
      return (
        <MessageComponent
          key={index}
          id={index}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          boundsRef={boundsRef}
        />
      );
    }
  };

  return (
    <Box
      ref={(node: any) => {
        setNodeRef(node);
        boundsRef.current = node;
      }}
      sx={style}
    >
      {components.length === 0 ? (
        <>Drop here</>
      ) : (
        components.map((component: any, index: number) =>
          renderComponents(component, index)
        )
      )}
    </Box>
  );
};

const TestPage = () => {
  const [components, setComponents] = useState<ComponentView[]>([]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async (event: DragEndEvent) => {
    const { over, active } = event;
    if (!over || over.id !== "dropzone") return;

    const droppedComponentProperties = active.data
      ?.current as DroppedComponentData;
    const finalX = active.rect.current.translated?.left;
    const finalY = active.rect.current.translated?.top;

    const containerRect = over.rect;
    const relativeX = Math.max(0, finalX! - containerRect.left);
    const relativeY = Math.max(0, finalY! - containerRect.top);

    if (droppedComponentProperties?.type) {
      const newComponent: CreateComponentRequest = {
        ...componentDefaults[droppedComponentProperties.type],
        worksheetId: 6,
        x: relativeX,
        y: relativeY,
      };

      var returnedComponent: ComponentView =
        await componentService.CreateComponent(newComponent);

      setComponents((prev) => [...prev, returnedComponent]);
    }
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      collisionDetection={pointerWithin}
      sensors={sensors}
    >
      <Stack direction="row" gap={1}>
        <TextComponentDraggable />
        <ImageComponentDraggable />
        <VideoComponentDraggable />
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
      </Stack>
      <Droppable components={components} />
    </DndContext>
  );
};

export default TestPage;
