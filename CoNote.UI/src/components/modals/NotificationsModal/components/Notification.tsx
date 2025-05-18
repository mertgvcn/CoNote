import { useNavigate } from "react-router-dom";
//redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../app/store";
import { deleteNotification } from "../../../../features/notification/slices/notificationSlice";
//models
import { NotificationType } from "../../../../models/enums/NotificationType";
import { NotificationView } from "../../../../models/views/NotificationView";
//icons
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
//components
import { Box, Stack, styled, Typography } from "@mui/material";
import IconButton from "../../../ui/IconButton";

const NotificationContainer = styled(Box)(({ theme }) => ({
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

type NotificationPropsType = {
  notification: NotificationView;
};

const Notification = ({ notification }: NotificationPropsType) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const dynamicStyle = {
    backgroundColor: !notification.isRead ? "#E6EEFE" : undefined,
  };

  const handleClick = async () => {
    if (notification.type === NotificationType.Other) {
    } else if (notification.type === NotificationType.Invitation) {
      navigate("/invitations");
    } else if (notification.type === NotificationType.Follow) {
    }
  };

  const handleDelete = async () => {
    await dispatch(deleteNotification(notification.id));
  };

  return (
    <NotificationContainer sx={dynamicStyle} onClick={handleClick}>
      <Stack
        direction="row"
        gap={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" gap={2} alignItems="center">
          {notification.type === NotificationType.Other && (
            <NotificationsIcon />
          )}
          {notification.type === NotificationType.Invitation && <MailIcon />}
          {notification.type === NotificationType.Follow && <PersonAddIcon />}

          <Typography variant="body1" component="span">
            {notification.message}{" "}
            <Typography variant="body2" color="grey.500" component="span">
              *{notification.createdAtHumanized}
            </Typography>
          </Typography>
        </Stack>

        <IconButton
          variant="text"
          color="secondary"
          size="small"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    </NotificationContainer>
  );
};

export default Notification;
