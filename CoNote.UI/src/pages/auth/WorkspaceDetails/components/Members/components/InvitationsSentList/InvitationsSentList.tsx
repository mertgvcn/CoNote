//redux
import { useSelector } from "react-redux";
import { invitationSelectors } from "../../../../../../../features/workspace/slices/workspaceDetailsSlice";
//models
import { InvitationType } from "../../../../../../../models/enums/InvitationType";
//components
import { Box, styled } from "@mui/material";
import InvitationsSentElement from "./InvitationsSentElement";

const InvitationsSentListContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.secondary.main}`,
}));

const InvitationsSentListEmptyContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  boxSizing: "border-box",
  cursor: "pointer",
}));

const InvitationsSentList = () => {
  const invitations = useSelector(invitationSelectors.selectAll);
  const inviteSentList = invitations.filter(
    (inv) => inv.type === InvitationType.InviteSent
  );

  return (
    <InvitationsSentListContainer>
      {inviteSentList.length === 0 ? (
        <InvitationsSentListEmptyContainer>There is no invitation sent</InvitationsSentListEmptyContainer>
      ) : (
        inviteSentList.map((invitationElement, index) => (
          <InvitationsSentElement
            invitationElement={invitationElement}
            key={index}
            isFirst={index === 0}
            isLast={index === inviteSentList.length - 1}
          />
        ))
      )}
    </InvitationsSentListContainer>
  );
};

export default InvitationsSentList;
