//redux
import { useSelector } from "react-redux";
import { invitationSelectors } from "../../../../../../../features/workspace/slices/workspaceDetailsSlice";
//models
import { InvitationType } from "../../../../../../../models/enums/InvitationType";
//components
import { Box, styled } from "@mui/material";
import RequestsToJoinElement from "./RequestsToJoinElement";

const RequestsToJoinListContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.secondary.main}`,
}));

const RequestToJoinListEmptyContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  boxSizing: "border-box",
  cursor: "pointer",
}));

const RequestsToJoinList = () => {
  const invitations = useSelector(invitationSelectors.selectAll);
  const requestsToJoinList = invitations.filter(
    (inv) => inv.type === InvitationType.JoinRequest
  );

  return (
    <RequestsToJoinListContainer>
      {requestsToJoinList.length === 0 ? (
        <RequestToJoinListEmptyContainer>There is no request to join</RequestToJoinListEmptyContainer>
      ) : (
        requestsToJoinList.map((invitationElement, index) => (
          <RequestsToJoinElement
            invitationElement={invitationElement}
            key={index}
            isFirst={index === 0}
            isLast={index === requestsToJoinList.length - 1}
          />
        ))
      )}
    </RequestsToJoinListContainer>
  );
};

export default RequestsToJoinList;
