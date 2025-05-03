//models
import { StructureView } from "../../../../../../models/views/StructureView";
import { StructureType } from "../../../../../../models/enums/StructureType";
//icons
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
//components
import { Box, Stack, styled, Typography, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../app/store";
import { getStructureByWorkspaceAndSectionId, updateClickedSections } from "../../../../../../features/workspace/slices/workspaceDetailsSlice";
import { useParams } from "react-router-dom";

const StructureElementContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
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

const StructureElementIconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  color: theme.palette.secondary.main,
}));

const StructureElementTypographyContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: "100%",
}));

type StructureElementPropsType = {
  structureElement: StructureView;
  isFirst?: boolean;
  isLast?: boolean;
};

const StructureElement = ({
  structureElement,
  isFirst = false,
  isLast = false,
}: StructureElementPropsType) => {
  const { id } = useParams();
  const workspaceId = Number(id);

  const theme = useTheme();
  const dynamicStyle = {
    borderBottom: !isLast
      ? `1px solid ${theme.palette.secondary.main}`
      : "none",
    borderTopLeftRadius: isFirst ? theme.shape.borderRadius : "0px",
    borderTopRightRadius: isFirst ? theme.shape.borderRadius : "0px",
    borderBottomLeftRadius: isLast ? theme.shape.borderRadius : "0px",
    borderBottomRightRadius: isLast ? theme.shape.borderRadius : "0px",
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleClick = async () => {
    if (structureElement.type === StructureType.Section) {
      const sectionId = structureElement.id;
      dispatch(updateClickedSections(sectionId))
      dispatch(getStructureByWorkspaceAndSectionId({ workspaceId, sectionId }));
    }
  };

  return (
    <StructureElementContainer onClick={handleClick} sx={dynamicStyle}>
      <Stack direction="row" spacing={1} alignItems="center" flex={2}>
        <StructureElementIconContainer>
          {structureElement.type === StructureType.Section ? (
            <FolderIcon />
          ) : (
            <InsertDriveFileOutlinedIcon />
          )}
        </StructureElementIconContainer>

        <StructureElementTypographyContainer>
          <Typography variant="body1">
            {structureElement.name}
          </Typography>
        </StructureElementTypographyContainer>
      </Stack>

      <StructureElementTypographyContainer flex={3}>
        <Typography variant="body1" color="grey.500">
          {structureElement.description}
        </Typography>
      </StructureElementTypographyContainer>

      <StructureElementTypographyContainer flex={1} justifyContent="flex-end">
        <Typography variant="body1" color="grey.500">
          {structureElement.createdAtHumanized}
        </Typography>
      </StructureElementTypographyContainer>
    </StructureElementContainer>
  );
};

export default StructureElement;
