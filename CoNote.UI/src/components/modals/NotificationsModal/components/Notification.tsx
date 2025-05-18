//models
import { NotificationType } from "../../../../models/enums/NotificationType";
import { NotificationView } from "../../../../models/views/NotificationView";
//icons
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
//components
import { Box, Stack, styled, Typography } from "@mui/material";

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
  const dynamicStyle = {
    backgroundColor: !notification.isRead ? "#E6EEFE" : undefined,
  };

  return (
    <NotificationContainer sx={dynamicStyle}>
      <Stack direction="row" gap={2} alignItems="center">
        {notification.type === NotificationType.Other && <NotificationsIcon />}
        {notification.type === NotificationType.Invitation && <MailIcon />}
        {notification.type === NotificationType.Follow && <PersonAddIcon />}

        <Typography variant="body1" component="span">
          {notification.message}{" "}
          <Typography variant="body2" color="grey.500" component="span">
            *{notification.createdAtHumanized}
          </Typography>
        </Typography>
      </Stack>
    </NotificationContainer>
  );
};

export default Notification;
