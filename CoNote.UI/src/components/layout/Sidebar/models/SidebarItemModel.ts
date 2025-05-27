import { ReactNode } from "react";
import { SidebarTab } from "./SidebarTab";

export interface SidebarItemModel {
  id: SidebarTab;
  label: string;
  muiIcon?: any;
  navigateTo?: string;
  isActive?: boolean;
  onClick?: any;
}
