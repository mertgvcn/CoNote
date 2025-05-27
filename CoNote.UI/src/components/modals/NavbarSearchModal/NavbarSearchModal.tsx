import { useCallback, useState } from "react";
//utils
import { workspaceService } from "../../../features/workspace/workspaceService";
import { userService } from "../../../features/user/userService";
import { debounce } from "../../../utils/debounce";
//models
import { WorkspaceView } from "../../../models/views/WorkspaceView";
import { SearchedUserView } from "../../../models/views/SearchedUserView";
//icons
import CloseIcon from "@mui/icons-material/Close";
//components
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Searchbar from "../../ui/Searchbar";
import SearchedList from "./components/SearchedList";
import SearchedUser from "./components/SearchedUser";
import SearchedWorkspace from "./components/SearchedWorkspace";

const NavbarSearchEmptyElement = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  boxSizing: "border-box",
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
}));

interface NavbarSearchModalProps {
  open: boolean;
  onClose: () => void;
}

const NavbarSearchModal = ({ open, onClose }: NavbarSearchModalProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchedWorkspaces, setSearchedWorkspaces] = useState<WorkspaceView[]>(
    []
  );
  const [searchedUsers, setSearchedUsers] = useState<SearchedUserView[]>([]);

  const resetStates = () => {
    setSearchValue("");
    setSearchedWorkspaces([]);
    setSearchedUsers([]);
  };

  const search = async (searchValue: string) => {
    if (!searchValue.trim()) {
      resetStates();
      return;
    }

    try {
      const workspaces = await workspaceService.SearchWorkspacesByName(
        searchValue,
        5
      );
      setSearchedWorkspaces(workspaces);

      const users = await userService.SearchUsersByUsername(searchValue, 5);
      setSearchedUsers(users);
    } catch (error) {}
  };

  const debouncedSearch = useCallback(debounce(search), []);
  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.trim());
    debouncedSearch(e.target.value.trim());
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle variant="h5" color="secondary">
        Search for workspaces or users
      </DialogTitle>
      <IconButton
        onClick={onClose}
        size="medium"
        color="secondary"
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent>
        <Stack direction="column" gap={2}>
          <Searchbar
            color="secondary"
            value={searchValue}
            onChange={handleSearchValueChange}
          />

          <Stack direction="column" gap={1}>
            <Typography variant="subtitle2" color="grey.500" fontWeight={500}>
              Workspaces
            </Typography>
            {searchedWorkspaces.length !== 0 ? (
              <SearchedList>
                {searchedWorkspaces.map((searchedWorkspace, index) => (
                  <SearchedWorkspace
                    searchedWorkspace={searchedWorkspace}
                    onClose={() => onClose()}
                    key={index}
                  />
                ))}
              </SearchedList>
            ) : (
              <SearchedList>
                <NavbarSearchEmptyElement>
                  No workspace found.
                </NavbarSearchEmptyElement>
              </SearchedList>
            )}

            <Divider variant="fullWidth" sx={{ my: 2 }} />

            <Typography variant="subtitle2" color="grey.500" fontWeight={500}>
              Users
            </Typography>
            {searchedUsers.length !== 0 ? (
              <SearchedList>
                {searchedUsers.map((searchedUser, index) => (
                  <SearchedUser
                    searchedUser={searchedUser}
                    onClose={() => onClose()}
                    key={index}
                  />
                ))}
              </SearchedList>
            ) : (
              <SearchedList>
                <NavbarSearchEmptyElement>
                  No user found.
                </NavbarSearchEmptyElement>
              </SearchedList>
            )}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default NavbarSearchModal;
