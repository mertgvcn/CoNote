//redux
import { useSelector } from "react-redux";
import { memberSelectors } from "../../../../../../features/workspace/slices/workspaceDetailsSlice";
//components
import { Box, styled } from "@mui/material";
import MemberElement from "./MemberElement";

const MemberListContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.secondary.main}`,
}));

const MemberList = () => {
  const members = useSelector(memberSelectors.selectAll);

  return (
    <MemberListContainer>
      {members.map((memberElement, index) => (
        <MemberElement
          memberElement={memberElement}
          key={index}
          isFirst={index === 0}
          isLast={index === members.length - 1}
        />
      ))}
    </MemberListContainer>
  );
};

export default MemberList;
