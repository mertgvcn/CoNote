import { ReactNode } from "react";
//components
import { Box, styled } from "@mui/material";

const SearchedListContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "fit-content",
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[2],
  userSelect: "none",
}));

type SearchedListPropsType = {
  children: ReactNode;
};

const SearchedList = ({ children }: SearchedListPropsType) => {
  return <SearchedListContainer>{children}</SearchedListContainer>;
};

export default SearchedList;
