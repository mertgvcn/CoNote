import { useState } from "react";
//redux
import {
  selectWorkspaceDetailsClickedSections,
  structureSelectors,
} from "../../../../../features/workspace/slices/workspaceDetailsSlice";
import { useSelector } from "react-redux";
//models
import { PermissionAction } from "../../../../../models/enums/PermissionAction";
import { PermissionObjectType } from "../../../../../models/enums/PermissionObjectType";
//components
import { Box, Button, Stack, styled } from "@mui/material";
import Searchbar from "../../../../../components/ui/Searchbar";
import StructureContainer from "./components/StructureContainer";
import StructureElement from "./components/StructureElement";
import GoUpElement from "./components/GoUpElement";
import PermissionGate from "../../../../../components/ui/PermissionGate";

const StructureEmptyElement = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: 40,
  backgroundColor: "inherit",
  padding: `0px ${theme.spacing(2)}`,
  boxSizing: "border-box",
  gap: theme.spacing(2),
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
}));

const Structure = () => {
  const structure = useSelector(structureSelectors.selectAll);
  const clickedSections = useSelector(selectWorkspaceDetailsClickedSections);
  const [searchText, setSearchText] = useState<string>(""); //TODO: Arama işlemini çalışır hale getir.

  return (
    <Stack direction="column" gap={2}>
      <Stack direction="row" gap={2}>
        <Searchbar color="secondary" value={searchText} />

        <PermissionGate
          action={PermissionAction.Add}
          objectType={PermissionObjectType.Structure}
        >
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            sx={{ flexShrink: 0 }}
          >
            Add new
          </Button>
        </PermissionGate>
      </Stack>

      <StructureContainer>
        {structure.length !== 0 ? (
          <>
            {clickedSections.length !== 0 && (
              <GoUpElement isOnlyElement={structure.length === 0} />
            )}

            {structure.map((structureElement, index) => (
              <StructureElement
                structureElement={structureElement}
                key={index}
                isFirst={clickedSections.length === 0}
                isLast={index === structure.length - 1}
              />
            ))}
          </>
        ) : (
          <StructureEmptyElement>
            No section or worksheet has been created before.
          </StructureEmptyElement>
        )}
      </StructureContainer>
    </Stack>
  );
};

export default Structure;
