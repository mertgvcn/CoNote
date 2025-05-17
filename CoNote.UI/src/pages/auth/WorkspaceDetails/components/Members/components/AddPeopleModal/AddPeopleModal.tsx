import { useCallback, useState } from "react";
//utils
import { debounce } from "../../../../../../../utils/debounce";
import { userService } from "../../../../../../../features/user/userService";
//models
import { SearchedUserView } from "../../../../../../../models/views/SearchedUserView";
//icons
import CloseIcon from "@mui/icons-material/Close";
//components
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Searchbar from "../../../../../../../components/ui/Searchbar";
import SearchedUserList from "./components/SearchedUserList";
import SearchedUser from "./components/SearchedUser";

interface AddPeopleModalProps {
  open: boolean;
  onClose: () => void;
}

const AddPeopleModal = ({ open, onClose }: AddPeopleModalProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchedUsers, setSearchedUsers] = useState<SearchedUserView[]>([]);
  const [selectedUser, setSelectedUser] = useState<SearchedUserView | null>(
    null
  );

  const searchUsers = async (searchValue: string) => {
    if (!searchValue.trim()) {
      setSearchedUsers([]);
      return;
    }

    try {
      const response = await userService.SearchUsersByUsername(searchValue, 5);
      setSearchedUsers(response);
    } catch (error) {}
  };

  const debouncedSearch = useCallback(debounce(searchUsers), []);
  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.trim());
    debouncedSearch(e.target.value.trim());
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle variant="h5" color="secondary">
        Add people to your workspace
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
          <Stack direction="column" gap={1}>
            {selectedUser === null ? (
              <>
                <Typography variant="body1">Search by username</Typography>
                <Searchbar
                  color="secondary"
                  value={searchValue}
                  onChange={handleSearchValueChange}
                />
                {searchedUsers.length !== 0 && (
                  <SearchedUserList>
                    {searchedUsers.map((searchedUser, index) => (
                      <SearchedUser
                        searchedUser={searchedUser}
                        setSelectedUser={setSelectedUser}
                        key={index}
                      />
                    ))}
                  </SearchedUserList>
                )}
              </>
            ) : (
              <>
                <SearchedUser
                  searchedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  isSelected
                />
              </>
            )}
          </Stack>

          <Stack
            direction="row"
            width="100%"
            justifyContent="flex-end"
            alignItems="center"
            gap={1}
          >
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => {}} color="primary" variant="contained">
              Send Invite
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AddPeopleModal;
