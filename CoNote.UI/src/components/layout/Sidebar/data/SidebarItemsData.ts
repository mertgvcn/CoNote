//redux
import { store } from "../../../../app/store";
import { getCurrentUserInvitations } from "../../../../features/invitation/slices/invitationSlice";
import { getCurrentUserWorkspaces } from "../../../../features/workspace/slices/workspaceSlice";
//models
import { SidebarItemModel } from "../models/SidebarItemModel";
import { SidebarTab } from "../models/SidebarTab";
//icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import MailIcon from "@mui/icons-material/Mail";

export const SidebarItemsData: SidebarItemModel[] = [
  {
    id: SidebarTab.Dashboard,
    label: "Dashboard",
    muiIcon: DashboardIcon,
    navigateTo: "/dashboard",
    onClick: async () => {
      await store.dispatch(getCurrentUserWorkspaces());
    },
  },
  {
    id: SidebarTab.Invitations,
    label: "Invitations",
    muiIcon: MailIcon,
    navigateTo: "/invitations",
    onClick: async () => {
      await store.dispatch(getCurrentUserInvitations());
    },
  },
];
