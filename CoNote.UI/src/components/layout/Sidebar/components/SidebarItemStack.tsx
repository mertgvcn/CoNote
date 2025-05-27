import { ReactNode } from "react";
//components
import { Stack } from "@mui/material";

type SidebarItemStackPropsType = {
  children: ReactNode;
  gap?: number;
};

const SidebarItemStack = ({ children, gap = 1 }: SidebarItemStackPropsType) => {
  return (
    <Stack direction="column" gap={gap} sx={{ width: "100%" }}>
      {children}
    </Stack>
  );
};

export default SidebarItemStack;
