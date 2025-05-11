import { useRef, useState } from "react";
import TextComponent from "../../../components/worksheet/TextComponent/TextComponent";
import { Box } from "@mui/material";

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
      <TextComponent
        id={2}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        boundsRef={workspaceRef}
      />
    </Box>
  );
};

export default TestPage;
