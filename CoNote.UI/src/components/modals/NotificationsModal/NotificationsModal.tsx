//redux
import { useSelector } from "react-redux";
import { notificationSelectors } from "../../../features/notification/slices/notificationSlice";
//icons
import CloseIcon from "@mui/icons-material/Close";
//components
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
} from "@mui/material";
import NotificationList from "./components/NotificationList";
import Notification from "./components/Notification";

const NotificationsEmptyContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  cursor: "pointer",
}));

interface NotificationsModalProps {
  open: boolean;
  onClose: () => void;
}

const NotificationsModal = ({ open, onClose }: NotificationsModalProps) => {
  const notifications = useSelector(notificationSelectors.selectAll);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle variant="h5" color="secondary">
        Notifications
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
        <NotificationList>
          {notifications.length === 0 ? (
            <NotificationsEmptyContainer>
              You don't have any notifications
            </NotificationsEmptyContainer>
          ) : (
            notifications.map((notification) => (
              <Notification key={notification.id} notification={notification} />
            ))
          )}
        </NotificationList>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationsModal;
