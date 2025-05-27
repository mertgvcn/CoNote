import { ReactNode } from "react";
//components
import { Box, styled } from "@mui/material";

const SearchedUserListContainer = styled(Box)(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "fit-content",
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[2]
}));

type SearchedUserListPropsType = {
  children: ReactNode;
};

const SearchedUserList = ({ children }: SearchedUserListPropsType) => {
  return <SearchedUserListContainer>{children}</SearchedUserListContainer>;
};

export default SearchedUserList;
