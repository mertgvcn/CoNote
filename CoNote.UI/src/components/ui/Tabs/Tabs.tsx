import { ReactNode } from "react";
//components
import { Box, styled, useTheme } from "@mui/material";

const TabsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
}));

type TabsPropsType = {
  children: ReactNode;
  withBottomBorder?: boolean;
};

const Tabs = ({ children, withBottomBorder = false }: TabsPropsType) => {
  const theme = useTheme();

  const dynamicStyles = {
    borderBottom: withBottomBorder
      ? `1px solid ${theme.palette.divider}`
      : "none",
  };

  return <TabsContainer sx={dynamicStyles}>{children}</TabsContainer>;
};

export default Tabs;
