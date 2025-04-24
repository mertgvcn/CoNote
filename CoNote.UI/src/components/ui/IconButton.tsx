import { Box, styled, Tooltip } from "@mui/material";
import { ReactNode } from "react";
import theme from "../../theme";

const sizeStyles = {
  small: {
    width: 32,
    height: 32,
    padding: theme.spacing(0.5),
  },
  medium: {
    width: 40,
    height: 40,
    padding: theme.spacing(1),
  },
  large: {
    width: 48,
    height: 48,
    padding: theme.spacing(1)
  },
};

const variantStyles = {
  contained: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  outlined: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    "&:hover": {
      color: theme.palette.primary.dark,
      borderColor: theme.palette.primary.dark,
    },
  },
  text: {
    backgroundColor: "inherit",
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.dark,
    },
  },
};

const IconButtonWrapper = styled(Box)<{
  size: "small" | "medium" | "large";
  variant: "contained" | "outlined" | "text";
}>(({ theme, size, variant }) => {
  const sizeStyle = sizeStyles[size];
  const variantStyle = variantStyles[variant];
  return {
    ...sizeStyle,
    ...variantStyle,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.shape.borderRadius,
    cursor: "pointer",
    transition: "background-color,color 0.2s ease",
  };
});

type IconButtonPropsType = {
  children: ReactNode;
  size?: "small" | "medium" | "large";
  variant?: "contained" | "outlined" | "text";
  tooltipTitle?: string;
  onClick?: any;
};

const IconButton = ({
  children,
  size = "medium",
  variant = "contained",
  tooltipTitle,
  onClick,
}: IconButtonPropsType) => {
  return (
    <>
      {tooltipTitle ? (
        <Tooltip title={tooltipTitle}>
          <IconButtonWrapper size={size} variant={variant} onClick={onClick}>
            {children}
          </IconButtonWrapper>
        </Tooltip>
      ) : (
        <IconButtonWrapper size={size} variant={variant} onClick={onClick}>
          {children}
        </IconButtonWrapper>
      )}
    </>
  );
};

export default IconButton;
