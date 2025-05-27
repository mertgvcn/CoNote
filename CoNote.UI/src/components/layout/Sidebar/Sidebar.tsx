import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
//data
import { SidebarItemsData } from "./data/SidebarItemsData";
//models
import { SidebarTab } from "./models/SidebarTab";
//components
import { Button, Divider } from "@mui/material";
import SidebarContainer from "./components/SidebarContainer";
import SidebarItemStack from "./components/SidebarItemStack";
import SidebarItem from "./components/SidebarItem";
import CreateModal from "../../modals/CreateModal/CreateModal";

const Sidebar = () => {
  const location = useLocation();

  const [selectedItem, setSelectedItem] = useState<SidebarTab>(
    SidebarTab.Dashboard
  );
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    SidebarItemsData.map((sidebarItem) => {
      if (location.pathname === sidebarItem.navigateTo) {
        setSelectedItem(sidebarItem.id);
      }
    });
  }, [location.pathname]);

  return (
    <>
      <SidebarContainer gap={2}>
        <SidebarItemStack>
          {SidebarItemsData.map((sidebarItem) => (
            <SidebarItem
              key={sidebarItem.id}
              label={sidebarItem.label}
              muiIcon={<sidebarItem.muiIcon fontSize="small" />}
              navigateTo={sidebarItem.navigateTo}
              isActive={selectedItem === sidebarItem.id}
              onClick={sidebarItem.onClick}
            />
          ))}
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
