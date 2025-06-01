//models
import { WorkspaceView } from "../../../../models/views/WorkspaceView";
//icons
import ArticleIcon from "@mui/icons-material/Article";
//components
import { Box, Stack, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SearchedWorkspaceContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  boxSizing: "border-box",
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  gap: theme.spacing(1),
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
}));

type SearchedWorkspacePropsType = {
  searchedWorkspace: WorkspaceView;
  onClose: () => void;
};

const SearchedWorkspace = ({
  searchedWorkspace,
  onClose,
}: SearchedWorkspacePropsType) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/workspace/${searchedWorkspace.id}`);
    onClose();
  };

  return (
    <SearchedWorkspaceContainer onClick={handleClick}>
      <Stack direction="row" gap={1} alignItems="center">
        <ArticleIcon />
        <Stack direction="column">
          <Typography variant="body1">{searchedWorkspace.name}</Typography>
          <Typography variant="body2" color="grey.500">
            {searchedWorkspace.description}
          </Typography>
        </Stack>
      </Stack>
    </SearchedWorkspaceContainer>
  );
};

export default SearchedWorkspace;
