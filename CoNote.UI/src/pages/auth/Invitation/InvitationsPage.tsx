import React, { useEffect, useState } from "react";
import { invitationService } from "../../../features/invitation/invitationService";
import { InvitationView } from "../../../models/views/InvitationView";
import { Stack, Typography } from "@mui/material";

const InvitationsPage = () => {
  const [invitations, setInvitations] = useState<InvitationView[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const data = await invitationService.GetCurrentUserInvitations();
        console.log(data);
        setInvitations(data);
      } catch (error) {
        console.error("Error fetching invitations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvitations();
  }, []);

  if (loading) {
    return <div>Loading invitations...</div>;
  }

  return (
    <Stack direction="column">
      <Typography variant="h5" fontWeight={"600"} ml={1}>
        Invitations
      </Typography>
      
    </Stack>
  );
};

export default InvitationsPage;
