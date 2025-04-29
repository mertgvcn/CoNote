import { useState } from "react";
//components
import { Button, Stack } from "@mui/material";
import Searchbar from "../../../../../components/ui/Searchbar";
import StructureContainer from "./components/StructureContainer";
import { useSelector } from "react-redux";
import { structureSelectors } from "../../../../../features/workspace/slices/workspaceDetailsSlice";
import StructureElement from "./components/StructureElement";
import { StructureView } from "../../../../../features/workspace/models/StructureView";
import { StructureType } from "../../../../../models/enums/StructureType";

const Structure = () => {
  const structure = useSelector(structureSelectors.selectAll);
  const [searchText, setSearchText] = useState<string>(""); //TODO: Arama işlemini çalışır hale getir.
  const [clickedSections, setClickedSections] = useState<number[]>([])

  return (
    <Stack direction="column" gap={1}>
      <Stack direction="row" gap={1}>
        <Searchbar color="secondary" value={searchText} />
        <Button
          variant="contained"
          color="secondary"
          size="medium"
          sx={{ flexShrink: 0 }}
        >
          Add new
        </Button>
      </Stack>

      <StructureContainer>
        {structure.map((structureElement, index) => (
          <StructureElement
            structureElement={structureElement}
            setClickedSections={setClickedSections}
            key={index}
            isFirst={index === 0}
            isLast={index === structure.length - 1}
          />
        ))}
      </StructureContainer>
    </Stack>
  );
};

export default Structure;
