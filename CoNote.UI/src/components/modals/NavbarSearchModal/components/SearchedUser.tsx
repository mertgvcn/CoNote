//models
import { SearchedUserView } from "../../../../models/views/SearchedUserView";
//icons
import PersonIcon from "@mui/icons-material/Person";
//components
import { Box, Stack, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SearchedUserContainer = styled(Box)(({ theme }) => ({
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

type SearchedUserPropsType = {
  searchedUser: SearchedUserView;
  onClose: () => void;
};

const SearchedUser = ({ searchedUser, onClose }: SearchedUserPropsType) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/user/${searchedUser.username}`);
    onClose();
  };

  return (
    <SearchedUserContainer onClick={handleClick}>
      <Stack direction="row" gap={1} alignItems="center">
        <PersonIcon />
        <Stack direction="column">
          <Typography variant="body1">{searchedUser.fullName}</Typography>
          <Typography variant="body2" color="grey.500">
            @{searchedUser.username}
          </Typography>
        </Stack>
      </Stack>
    </SearchedUserContainer>
  );
};

export default SearchedUser;
