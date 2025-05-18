import { ReactNode } from "react";
//components
import { Box, styled } from "@mui/material";

const NotificationListContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "320px",
  overflowY: "auto",
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}));

type NotificationListPropsType = {
  children: ReactNode;
};

const NotificationList = ({ children }: NotificationListPropsType) => {
  return <NotificationListContainer>{children}</NotificationListContainer>;
};

export default NotificationList;
