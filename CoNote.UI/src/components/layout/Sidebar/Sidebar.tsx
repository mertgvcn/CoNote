import { useState } from "react";
//icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
//components
import { Button, Divider } from "@mui/material";
import SidebarContainer from "./components/SidebarContainer";
import SidebarItemStack from "./components/SidebarItemStack";
import SidebarItem from "./components/SidebarItem";
import CreateModal from "../../modals/CreateModal/CreateModal";

const Sidebar = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <>
      <SidebarContainer gap={2}>
        <SidebarItemStack>
          <SidebarItem
            label="Dashboard"
            muiIcon={<DashboardIcon fontSize="small" />}
            navigateTo="/dashboard"
            isActive
          />
          <SidebarItem
            label="Workspaces"
            muiIcon={<ArticleIcon fontSize="small" />}
            navigateTo="/dashboard"
          />
        </SidebarItemStack>

        <Divider />

        <SidebarItemStack>
          <Button
            variant="contained"
            color="primary"
            size="small"
            fullWidth
            onClick={() => setShowCreateModal(true)}
          >
            Create
          </Button>
        </SidebarItemStack>

        {/* <Divider />

        <SidebarItemStack>
          <Typography variant="subtitle2" fontWeight={500}>
            Workspaces
          </Typography>
        </SidebarItemStack> */}
      </SidebarContainer>

      <CreateModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </>
  );
};

export default Sidebar;
