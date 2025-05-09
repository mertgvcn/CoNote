import { Box, styled } from "@mui/material";
import { ReactNode } from "react";

const PageWrapperStyled = styled(Box)({
  minHeight: "calc(100vh - 64.8px)",
  width: "100%",
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
});

type PageWrapperPropsType = {
  children?: ReactNode;
};

const PageWrapper = ({ children }: PageWrapperPropsType) => {
  return <PageWrapperStyled>{children}</PageWrapperStyled>;
};

export default PageWrapper;
