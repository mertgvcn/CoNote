//components
import { Box, styled } from "@mui/material";
import { ReactNode } from "react";

const InvitationListContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  overflowY: "auto",
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}));

type InvitationListPropsType = {
  children: ReactNode;
};

const InvitationList = ({ children }: InvitationListPropsType) => {
  return <InvitationListContainer>{children}</InvitationListContainer>;
};

export default InvitationList;
