//models
import { WorkspaceInvitationView } from "../../../../../../../models/views/WorkspaceInvitationView";
//icons
import PersonIcon from "@mui/icons-material/Person";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
//components
import {
  Box,
  IconButton,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";

const RequestsToJoinElementContainer = styled(Box)(({ theme }) => ({
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

type RequestsToJoinElementPropsType = {
  invitationElement: WorkspaceInvitationView;
  isFirst?: boolean;
  isLast?: boolean;
};

const RequestsToJoinElement = ({
  invitationElement,
  isFirst = false,
  isLast = false,
}: RequestsToJoinElementPropsType) => {
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

  return (
    <RequestsToJoinElementContainer sx={dynamicStyle}>
      <Stack direction="row" gap={1} alignItems="center">
        <PersonIcon />
        <Stack direction="column">
          <Typography variant="body1">
            {invitationElement.senderFullName}
          </Typography>
          <Typography variant="body2" color="grey.500">
            @{invitationElement.senderUsername}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" gap={1} alignItems="center">
        <IconButton color="error" size="small">
          <ClearIcon />
        </IconButton>
        <IconButton color="success" size="small">
          <CheckIcon />
        </IconButton>
      </Stack>
    </RequestsToJoinElementContainer>
  );
};

export default RequestsToJoinElement;
