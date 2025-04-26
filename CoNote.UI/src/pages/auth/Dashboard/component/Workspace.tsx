//models
import { WorkspaceView } from "../../../../features/workspace/models/WorkspaceView";
//components
import { Typography, styled, Box, Tooltip } from "@mui/material";

const WorkspaceContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minWidth: 240,
  padding: theme.spacing(1),
  boxSizing: "border-box",
  gap: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "inherit",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 150,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#550293",
}));

const TextContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  color: theme.palette.text.primary,
}));

type WorkspacePropTypes = {
  workspace: WorkspaceView;
};

const Workspace = ({ workspace }: WorkspacePropTypes) => {
  return (
    <WorkspaceContainer>
      <ImageContainer></ImageContainer>
      <Tooltip title={workspace.name}>
        <TextContainer>
          <Typography
            variant="h6"
            color="grey.500"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {workspace.name}
          </Typography>
        </TextContainer>
      </Tooltip>
    </WorkspaceContainer>
  );
};

export default Workspace;
