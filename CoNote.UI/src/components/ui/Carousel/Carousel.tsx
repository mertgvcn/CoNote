import { Stack, styled, useTheme } from "@mui/material";
import { ReactNode } from "react";

const CarouselContainer = styled(Stack)(({ theme }) => ({
  overflowX: "auto",
}));

type CarouselPropsType = {
  children: ReactNode;
  disableGap: boolean;
};

const Carousel = ({ children, disableGap = false }: CarouselPropsType) => {
  const theme = useTheme();

  return (
    <CarouselContainer
      direction="row"
      gap={!disableGap ? theme.spacing(2) : undefined}
    >
      {children}
    </CarouselContainer>
  );
};

export default Carousel;
