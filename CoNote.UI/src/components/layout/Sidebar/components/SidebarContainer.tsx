import { ReactNode } from "react";
//components
import { Box, styled, useTheme } from "@mui/material";

const SidebarContainerStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100%",
  borderRight: `1px solid ${theme.palette.divider}`,
  boxSizing: "border-box",
}));

type SidebarContainerPropsType = {
  children: ReactNode;
  gap?: number;
  width?: number | string;
  withoutPaddingY?: boolean;
};

const SidebarContainer = ({
  children,
  gap = 1,
  width = 240,
  withoutPaddingY = false,
}: SidebarContainerPropsType) => {
  const theme = useTheme()

  const dynamicStyles = {
    gap: gap,
    minWidth: width,
    padding: withoutPaddingY ? `0px ${theme.spacing(1)}` : `${theme.spacing(2)} ${theme.spacing(1)}`,
  };

  return (
    <SidebarContainerStyled sx={dynamicStyles}>
      {children}
    </SidebarContainerStyled>
  );
};

export default SidebarContainer;
