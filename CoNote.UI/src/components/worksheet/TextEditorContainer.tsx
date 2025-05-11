import { ReactNode } from "react";
import { Stack, styled } from "@mui/material";

const TextEditorContainerStyled = styled(Stack)(({ theme }) => ({
  position: "absolute",
  top: -60,
  alignItems: "center",
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  boxSizing: "border-box",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

type TextEditorContainerPropsType = {
  children: ReactNode;
};

const TextEditorContainer = ({ children }: TextEditorContainerPropsType) => {
  return (
    <TextEditorContainerStyled direction="row" gap={1}>
      {children}
    </TextEditorContainerStyled>
  );
};

export default TextEditorContainer;
