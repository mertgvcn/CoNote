import { ReactNode } from "react";
//components
import { Box, styled, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const SidebarItemContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  height: 40,
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
}));

const SidebarItemIconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "48px",
}));

type SidebarItemPropsType = {
  label: string;
  muiIcon?: ReactNode;
  color?: "primary" | "secondary";
  isActive?: boolean;
  navigateTo?: string;
  onClick?: any;
};

const SidebarItem = ({
  label,
  muiIcon,
  color = "primary",
  isActive = false,
  navigateTo,
  onClick,
}: SidebarItemPropsType) => {
  const theme = useTheme();
  const colorValue =
    color === "primary"
      ? theme.palette.primary.main
      : theme.palette.secondary.main;

  const dynamicStyles = {
    backgroundColor: isActive
      ? theme.palette.background.paper
      : theme.palette.background.default,
    borderRight: isActive ? `4px solid ${colorValue}` : "none",
    boxShadow: isActive ? theme.shadows[2] : "none",
    padding: muiIcon ? "0px" : theme.spacing(2),
    "&:hover": isActive
      ? undefined
      : {
          backgroundColor: theme.palette.grey[200],
        },
  };

  return (
    <>
      {navigateTo ? (
        <Link
          to={navigateTo}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <SidebarItemContainer sx={dynamicStyles} onClick={onClick}>
            {muiIcon && (
              <SidebarItemIconContainer
                color={isActive ? colorValue : "grey.500"}
              >
                {muiIcon}
              </SidebarItemIconContainer>
            )}
            <Typography
              variant="body1"
              color={isActive ? "textPrimary" : "grey.500"}
              fontWeight={isActive ? "500" : "400"}
            >
              {label}
            </Typography>
          </SidebarItemContainer>
        </Link>
      ) : (
        <SidebarItemContainer sx={dynamicStyles} onClick={onClick}>
          {muiIcon && (
            <SidebarItemIconContainer
              color={isActive ? colorValue : "grey.500"}
            >
              {muiIcon}
            </SidebarItemIconContainer>
          )}
          <Typography
            variant="body1"
            color={isActive ? "textPrimary" : "grey.500"}
            fontWeight={isActive ? "500" : "400"}
          >
            {label}
          </Typography>
        </SidebarItemContainer>
      )}
    </>
  );
};

export default SidebarItem;
