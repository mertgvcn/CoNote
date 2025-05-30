import { useNavigate } from "react-router-dom";
//models
import { WorkspaceView } from "../../../../models/views/WorkspaceView";
//components
import { Typography, styled, Box, Tooltip } from "@mui/material";

const WorkspaceCardContainer = styled(Box)(({ theme }) => ({
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

type WorkspaceCardPropTypes = {
  workspace: WorkspaceView;
};

const WorkspaceCard = ({ workspace }: WorkspaceCardPropTypes) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/workspace/${workspace.id}`)
  }

  return (
    <WorkspaceCardContainer onClick={handleClick}>
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
    </WorkspaceCardContainer>
  );
};

export default WorkspaceCard;
