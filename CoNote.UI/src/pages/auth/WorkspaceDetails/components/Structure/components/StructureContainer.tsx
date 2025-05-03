import { ReactNode } from "react";
//components
import { Stack, styled } from "@mui/material";

const StructureContainerStyled = styled(Stack)(({ theme }) => ({
  width: "100%",
  maxHeight: "100%",
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.secondary.main}`,
}));

type StructureContainerPropsStyle = {
  children?: ReactNode;
};

const StructureContainer = ({ children }: StructureContainerPropsStyle) => {
  return (
    <StructureContainerStyled direction="column">
      {children}
    </StructureContainerStyled>
  );
};

export default StructureContainer;
