//models
import { SearchedUserView } from "../../../../../../../../models/views/SearchedUserView";
//icons
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
//components
import {
  Box,
  IconButton,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";

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
}));

type SearchedUserPropsType = {
  searchedUser: SearchedUserView;
  setSelectedUser: React.Dispatch<
    React.SetStateAction<SearchedUserView | null>
  >;
  isSelected?: boolean;
};

const SearchedUser = ({
  searchedUser,
  setSelectedUser,
  isSelected = false,
}: SearchedUserPropsType) => {
  const theme = useTheme();

  const dynamicStyle = {
    border: isSelected ? `1px solid ${theme.palette.divider}` : undefined,
    boxShadow: isSelected ? theme.shadows[2] : undefined,
    "&:hover": {
      backgroundColor: !isSelected ? theme.palette.grey[200] : undefined,
    },
  };

  const handleClick = () => {
    if (!isSelected) setSelectedUser(searchedUser);
  };

  const handleDeselect = (e: React.MouseEvent) => {
    setSelectedUser(null);
  };

  return (
    <SearchedUserContainer sx={dynamicStyle} onClick={handleClick}>
      <Stack direction="row" gap={1} alignItems="center">
        <PersonIcon />
        <Stack direction="column">
          <Typography variant="body1">{searchedUser.fullName}</Typography>
          <Typography variant="body2" color="grey.500">
            @{searchedUser.username}
          </Typography>
        </Stack>
      </Stack>

      {isSelected && (
        <IconButton
          color="secondary"
          size="small"
          onClick={() => setSelectedUser(null)}
        >
          <CloseIcon />
        </IconButton>
      )}
    </SearchedUserContainer>
  );
};

export default SearchedUser;
