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
    padding: theme.spacing(1),
  },
};

type PaletteColorKey =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";

const getVariantStyles = (color: PaletteColorKey) => ({
  contained: {
    backgroundColor: theme.palette[color].main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette[color].dark,
    },
  },
  outlined: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette[color].main,
    border: `1px solid ${theme.palette[color].main}`,
    "&:hover": {
      color: theme.palette[color].dark,
      borderColor: theme.palette[color].dark,
    },
  },
  text: {
    backgroundColor: "inherit",
    color: theme.palette[color].main,
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
      color: theme.palette[color].dark,
    },
  },
});

const IconButtonWrapper = styled(Box)<{
  size: "small" | "medium" | "large";
  variant: "contained" | "outlined" | "text";
  color: PaletteColorKey;
}>(({ theme, size, variant, color }) => {
  const sizeStyle = sizeStyles[size];
  const variantStyle = getVariantStyles(color)[variant];
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
  color?: PaletteColorKey;
  tooltipTitle?: string;
  onClick?: any;
};

const IconButton = ({
  children,
  size = "medium",
  variant = "contained",
  color = "primary",
  tooltipTitle,
  onClick,
}: IconButtonPropsType) => {
  return (
    <>
      {tooltipTitle ? (
        <Tooltip title={tooltipTitle}>
          <IconButtonWrapper
            size={size}
            variant={variant}
            color={color}
            onClick={onClick}
          >
            {children}
          </IconButtonWrapper>
        </Tooltip>
      ) : (
        <IconButtonWrapper
          size={size}
          variant={variant}
          color={color}
          onClick={onClick}
        >
          {children}
        </IconButtonWrapper>
      )}
    </>
  );
};

export default IconButton;
