//redux
import { useSelector } from "react-redux";
//icons
import CloseIcon from "@mui/icons-material/Close";
//components
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";

interface NotificationsModalProps {
  open: boolean;
  onClose: () => void;
}

const NotificationsModal = ({ open, onClose }: NotificationsModalProps) => {
  //const notifications = useSelector();

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

      </DialogContent>
    </Dialog>
  );
};

export default NotificationsModal;
