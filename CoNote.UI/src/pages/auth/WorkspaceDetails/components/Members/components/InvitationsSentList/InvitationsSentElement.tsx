import { useParams } from "react-router-dom";
//redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../../app/store";
import { getInvitationsByWorkspaceId } from "../../../../../../../features/workspace/slices/workspaceDetailsSlice";
//utils
import { invitationService } from "../../../../../../../features/invitation/invitationService";
//models
import { WorkspaceInvitationView } from "../../../../../../../models/views/WorkspaceInvitationView";
import { InvitationStatus } from "../../../../../../../models/enums/InvitationStatus";
//icons
import PersonIcon from "@mui/icons-material/Person";
import ClearIcon from "@mui/icons-material/Clear";
//components
import {
  Box,
  Chip,
  IconButton,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";

const InvitationsSentElementContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  boxSizing: "border-box",
  borderBottom: `1px solid ${theme.palette.secondary.main}`,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
}));

type InvitationsSentElementPropsType = {
  invitationElement: WorkspaceInvitationView;
  isFirst?: boolean;
  isLast?: boolean;
};

const InvitationsSentElement = ({
  invitationElement,
  isFirst = false,
  isLast = false,
}: InvitationsSentElementPropsType) => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const theme = useTheme();

  const dynamicStyle = {
    borderBottom: !isLast
      ? `1px solid ${theme.palette.secondary.main}`
      : "none",
    borderTopLeftRadius: isFirst ? theme.shape.borderRadius : "0px",
    borderTopRightRadius: isFirst ? theme.shape.borderRadius : "0px",
    borderBottomLeftRadius: isLast ? theme.shape.borderRadius : "0px",
    borderBottomRightRadius: isLast ? theme.shape.borderRadius : "0px",
  };

  const getChipColor = (
    status: InvitationStatus
  ): "warning" | "success" | "error" => {
    switch (status) {
      case InvitationStatus.Pending:
        return "warning";
      case InvitationStatus.Accepted:
        return "success";
      case InvitationStatus.Rejected:
        return "error";
      default:
        return "warning";
    }
  };

  const handleDelete = async () => {
    try {
      await invitationService.DeleteInvitation(invitationElement.id);
      await dispatch(getInvitationsByWorkspaceId(Number(id)));
    } catch (error: any) {}
  };

  return (
    <InvitationsSentElementContainer sx={dynamicStyle}>
      <Stack direction="row" gap={1} alignItems="center">
        <PersonIcon />
        <Stack direction="column">
          <Typography variant="body1">
            {invitationElement.receiverFullName}
          </Typography>
          <Typography variant="body2" color="grey.500">
            @{invitationElement.receiverUsername}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" gap={1} alignItems="center">
        <Chip
          label={InvitationStatus[invitationElement.status]}
          color={getChipColor(invitationElement.status)}
        />
        <IconButton color="secondary" size="small" onClick={handleDelete}>
          <ClearIcon />
        </IconButton>
      </Stack>
    </InvitationsSentElementContainer>
  );
};

export default InvitationsSentElement;
