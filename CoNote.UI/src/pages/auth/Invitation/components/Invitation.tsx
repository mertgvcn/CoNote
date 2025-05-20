//redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../app/store";
import { updateInvitationStatus } from "../../../../features/invitation/slices/invitationSlice";
//utils
import { getChipColorByInvitationStatus } from "../../../../utils/getChipColorByInvitationStatus";
//models
import { InvitationView } from "../../../../models/views/InvitationView";
import { InvitationStatus } from "../../../../models/enums/InvitationStatus";
import { UpdateInvitationStatusRequest } from "../../../../api/Invitation/models/UpdateInvitationStatusRequest";
//icons
import MailIcon from "@mui/icons-material/Mail";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
//components
import { Box, Chip, Stack, styled, Typography } from "@mui/material";
import IconButton from "../../../../components/ui/IconButton";
import { workspaceMemberService } from "../../../../features/workspaceMember/workspaceMemberService";
import { AddMemberToWorkspaceRequest } from "../../../../api/WorkspaceMember/models/AddMemberToWorkspaceRequest";
import { RenderSuccessToast } from "../../../../utils/CustomToastManager";

const InvitationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  minHeight: "48px",
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  boxSizing: "border-box",
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  gap: theme.spacing(1),
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
}));

type InvitationPropsType = {
  invitation: InvitationView;
};

const Invitation = ({ invitation }: InvitationPropsType) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRejectInvitation = async () => {
    var request: UpdateInvitationStatusRequest = {
      invitationId: invitation.id,
      status: InvitationStatus.Rejected,
    };

    await dispatch(updateInvitationStatus(request));
  };

  const handleAcceptInvitation = async () => {
    try {
      var addMemberToWorkspaceRequest: AddMemberToWorkspaceRequest = {
        userId: invitation.receiverId!,
        workspaceId: invitation.workspaceId,
        roleId: invitation.roleId,
      };
      await workspaceMemberService.AddMemberToWorkspace(
        addMemberToWorkspaceRequest
      );

      var updateInvitationStatusRequest: UpdateInvitationStatusRequest = {
        invitationId: invitation.id,
        status: InvitationStatus.Accepted,
      };

      await dispatch(updateInvitationStatus(updateInvitationStatusRequest));
      RenderSuccessToast(
        `You've successfully joined to ${invitation.workspaceName}`
      );
    } catch (error: any) {}
  };

  return (
    <InvitationContainer>
      <Stack direction="row" gap={2} alignItems="center">
        <MailIcon />

        <Typography variant="body1" component="span">
          {invitation.senderUsername} has invited you to{" "}
          {invitation.workspaceName} as '{invitation.roleName}'.{" "}
          <Typography variant="body2" color="grey.500" component="span">
            *{invitation.createdAtHumanized}
          </Typography>
        </Typography>
      </Stack>

      <Stack direction="row" gap={1} alignItems="center">
        <Chip
          label={InvitationStatus[invitation.status]}
          color={getChipColorByInvitationStatus(invitation.status)}
          size="small"
        />

        {invitation.status === InvitationStatus.Pending && (
          <>
            <IconButton
              variant="text"
              color="error"
              size="small"
              onClick={handleRejectInvitation}
            >
              <ClearIcon />
            </IconButton>

            <IconButton
              variant="text"
              color="success"
              size="small"
              onClick={handleAcceptInvitation}
            >
              <CheckIcon />
            </IconButton>
          </>
        )}
      </Stack>
    </InvitationContainer>
  );
};

export default Invitation;
