import { ReactNode } from "react";
//components
import { Box, styled, Typography, useTheme } from "@mui/material";

const TabContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  height: "100%",
  padding: theme.spacing(2),
  boxSizing: "content-box",
  gap: theme.spacing(1),
  cursor: "pointer",
  transition: "color 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
}));

const TabIconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const TabActiveIndicator = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: 0,
  bottom: 0,
  height: 3,
  width: "100%",
  transition: "background-color 0.2s ease",
}));

type TabPropsType = {
  label: string;
  muiIcon?: ReactNode;
  color?: "primary" | "secondary";
  isActive?: boolean;
  onClick?: any;
};

const Tab = ({
  label,
  muiIcon,
  color = "primary",
  isActive = false,
  onClick,
}: TabPropsType) => {
  const theme = useTheme();
  const colorValue =
    color === "primary"
      ? theme.palette.primary.main
      : theme.palette.secondary.main;

  const dynamicStyles = {
    color: isActive ? colorValue : theme.palette.grey[500],
  };

  const tabActiveIndicatorDynamicStyles = {
    backgroundColor: isActive ? colorValue : "none",
  };

  return (
    <TabContainer sx={dynamicStyles} onClick={onClick}>
      {muiIcon && <TabIconContainer>{muiIcon}</TabIconContainer>}
      <Typography variant="body1" fontWeight={isActive ? "500" : "400"}>
        {label}
      </Typography>

      <TabActiveIndicator sx={tabActiveIndicatorDynamicStyles} />
    </TabContainer>
  );
};

export default Tab;
