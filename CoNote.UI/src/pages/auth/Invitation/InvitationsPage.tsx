//redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import {
  getCurrentUserInvitations,
  invitationSelectors,
} from "../../../features/invitation/slices/invitationSlice";
//components
import { Box, Stack, styled, Typography } from "@mui/material";
import InvitationList from "./components/InvitationList";
import Invitation from "./components/Invitation";
import { useEffect } from "react";

const InvitationsEmptyContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  borderRadius: theme.shape.borderRadius,
  boxSizing: "border-box",
  cursor: "pointer",
}));

const InvitationsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const invitations = useSelector(invitationSelectors.selectAll);

  const fetchInvitations = async () => {
    await dispatch(getCurrentUserInvitations());
  };

  useEffect(() => {
    if (invitations.length === 0) fetchInvitations();
  }, [invitations.length]);

  return (
    <Stack direction="column" gap={1} height="100%">
      <Typography variant="h5" fontWeight={"600"}>
        Invitations
      </Typography>

      <InvitationList>
        {invitations.length === 0 ? (
          <InvitationsEmptyContainer>
            You don't have any invitations.
          </InvitationsEmptyContainer>
        ) : (
          invitations.map((invitation) => (
            <Invitation key={invitation.id} invitation={invitation} />
          ))
        )}
      </InvitationList>
    </Stack>
  );
};

export default InvitationsPage;
