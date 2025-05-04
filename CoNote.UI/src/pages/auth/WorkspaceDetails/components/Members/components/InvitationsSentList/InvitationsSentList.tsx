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

const InvitationsSentList = () => {
  const invitations = useSelector(invitationSelectors.selectAll);
  const inviteSentList = invitations.filter(
    (inv) => inv.type === InvitationType.InviteSent
  );

  return (
    <InvitationsSentListContainer>
      {inviteSentList.map((invitationElement, index) => (
        <InvitationsSentElement
          invitationElement={invitationElement}
          key={index}
          isFirst={index === 0}
          isLast={index === inviteSentList.length - 1}
        />
      ))}
    </InvitationsSentListContainer>
  );
};

export default InvitationsSentList;
