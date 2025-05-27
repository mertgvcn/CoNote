import { useParams } from "react-router-dom";
import { useCallback, useState } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import { getInvitationsByWorkspaceId, rolesSelectors } from "../../../../../../../features/workspace/slices/workspaceDetailsSlice";
import { AppDispatch } from "../../../../../../../app/store";
//utils
import { debounce } from "../../../../../../../utils/debounce";
import { userService } from "../../../../../../../features/user/userService";
import { invitationService } from "../../../../../../../features/invitation/invitationService";
//models
import { SearchedUserView } from "../../../../../../../models/views/SearchedUserView";
import { SendInvitationRequest } from "../../../../../../../api/Invitation/models/SendInvitationRequest";
//icons
import CloseIcon from "@mui/icons-material/Close";
//components
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
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
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const roles = useSelector(rolesSelectors.selectAll);

  const [searchValue, setSearchValue] = useState<string>("");
  const [searchedUsers, setSearchedUsers] = useState<SearchedUserView[]>([]);
  const [selectedUser, setSelectedUser] = useState<SearchedUserView | null>(
    null
  );
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);

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

  const resetStates = () => {
    setSearchValue("");
    setSearchedUsers([]);
    setSelectedUser(null);
    setSelectedRoleId(null);
  };

  const handleSendInvite = async () => {
    var request: SendInvitationRequest = {
      workspaceId: Number(id),
      receiverId: selectedUser!.id,
      roleId: selectedRoleId!,
    };

    try {
      await invitationService.SendInvitation(request);
      await dispatch(getInvitationsByWorkspaceId(Number(id)))
      resetStates();
      onClose();
    } catch (error: any) {}
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
              <Stack direction="column" gap={2}>
                <SearchedUser
                  searchedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  isSelected
                />

                <Stack direction="row" gap={1} alignItems="center">
                  <Typography variant="body1">
                    Assign role for new callaborator
                  </Typography>

                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>Select role</InputLabel>
                    <Select
                      labelId="role-select-label"
                      value={selectedRoleId}
                      label="Select role"
                      onChange={(e) =>
                        setSelectedRoleId(Number(e.target.value))
                      }
                    >
                      {roles.map((role) => (
                        <MenuItem key={role.id} value={role.id}>
                          {role.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              </Stack>
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
            <Button
              onClick={handleSendInvite}
              color="primary"
              variant="contained"
              disabled={selectedUser === null || selectedRoleId === null}
            >
              Send Invite
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AddPeopleModal;
