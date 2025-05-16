import { Box, styled, useTheme } from "@mui/material";
import { ReactNode } from "react";

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  isolation: "isolate",
  display: "flex",
  flexDirection: "row",
  flexFlow: "row nowrap",
  alignItems: "center",
  overflowX: "auto",
  overflowY: "hidden",
  zIndex: 0,
}));

type CarouselPropsType = {
  children: ReactNode;
  disableGap?: boolean;
};

const Carousel = ({ children, disableGap = false }: CarouselPropsType) => {
  const theme = useTheme();

  return (
    <CarouselContainer gap={!disableGap ? theme.spacing(2) : undefined}>
      {children}
    </CarouselContainer>
  );
};

export default Carousel;
