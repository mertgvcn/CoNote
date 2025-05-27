import { useState } from "react";
import {
  selectWorkspaceDetailsClickedSections,
  structureSelectors,
} from "../../../../../features/workspace/slices/workspaceDetailsSlice";
//redux
import { useSelector } from "react-redux";
//components
import { Button, Stack } from "@mui/material";
import Searchbar from "../../../../../components/ui/Searchbar";
import StructureContainer from "./components/StructureContainer";
import StructureElement from "./components/StructureElement";
import GoUpElement from "./components/GoUpElement";

const Structure = () => {
  const structure = useSelector(structureSelectors.selectAll);
  const clickedSections = useSelector(selectWorkspaceDetailsClickedSections);
  const [searchText, setSearchText] = useState<string>(""); //TODO: Arama işlemini çalışır hale getir.

  return (
    <Stack direction="column" gap={2}>
      <Stack direction="row" gap={2}>
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
        {clickedSections.length !== 0 && <GoUpElement isOnlyElement={structure.length === 0} />}
        {structure.map((structureElement, index) => (
          <StructureElement
            structureElement={structureElement}
            key={index}
            isFirst={clickedSections.length === 0}
            isLast={index === structure.length - 1}
          />
        ))}
      </StructureContainer>
    </Stack>
  );
};

export default Structure;
