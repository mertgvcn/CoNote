import { useParams } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../../../app/store";
//icons
import FolderIcon from "@mui/icons-material/Folder";
//components
import { Box, Stack, styled, Typography, useTheme } from "@mui/material";
import {
  getStructureByWorkspaceAndSectionId,
  removeClickedSection,
  selectWorkspaceDetailsClickedSections,
} from "../../../../../../features/workspace/slices/workspaceDetailsSlice";

const StructureElementContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  height: 38.25,
  backgroundColor: "inherit",
  color: theme.palette.text.primary,
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
  padding: `0px ${theme.spacing(2)}`,
  boxSizing: "border-box",
  gap: theme.spacing(2),
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

type GoUpElementPropsType = {
  isOnlyElement: boolean;
};

const GoUpElement = ({ isOnlyElement }: GoUpElementPropsType) => {
  const { id } = useParams();
  const workspaceId = Number(id);

  const theme = useTheme();
  const dynamicStyle = {
    borderBottom: !isOnlyElement
      ? `1px solid ${theme.palette.secondary.main}`
      : "none",
    borderBottomLeftRadius: isOnlyElement ? theme.shape.borderRadius : "0px",
    borderBottomRightRadius: isOnlyElement ? theme.shape.borderRadius : "0px",
  };

  const clickedSections = useSelector(selectWorkspaceDetailsClickedSections);

  const dispatch = useDispatch<AppDispatch>();

  const handleClick = async () => {
    const updatedSections = [...clickedSections];
    const currentSection = updatedSections.pop();
    const previousSection = updatedSections.pop();

    dispatch(removeClickedSection(currentSection));
    dispatch(
      getStructureByWorkspaceAndSectionId({
        workspaceId,
        sectionId: previousSection,
      })
    );
  };

  return (
    <StructureElementContainer onClick={handleClick} sx={dynamicStyle}>
      <Stack direction="row" spacing={1} alignItems="center" flex={2}>
        <StructureElementIconContainer>
          <FolderIcon />
        </StructureElementIconContainer>

        <StructureElementTypographyContainer>
          <Typography variant="body1" color="text.primary">
            ...
          </Typography>
        </StructureElementTypographyContainer>
      </Stack>
    </StructureElementContainer>
  );
};

export default GoUpElement;
