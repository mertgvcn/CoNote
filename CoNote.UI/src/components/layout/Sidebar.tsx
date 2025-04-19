//utils
import theme from "../../theme";
import { useNavigate } from "react-router-dom";
//icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
//components
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import CreateModal from "../modals/CreateModal";

const ToggleButtonWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  width: "100%",
  padding: theme.spacing(1),
  boxSizing: "border-box",
}));

const Sidebar = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            height: "100%",
            backgroundColor: theme.palette.background.default,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />

        <ToggleButtonWrapper>
          <IconButton size="small" color="secondary">
            <ChevronLeftIcon />
          </IconButton>
        </ToggleButtonWrapper>

        <Divider variant="middle" />

        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              <ListItemIcon color="secondary.main">
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText color="secondary.main">Dashboard</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/workspaces");
              }}
            >
              <ListItemIcon color="secondary.main">
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText color="secondary.main">Workspaces</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              fullWidth
              onClick={() => setOpenCreateModal(true)}
            >
              Create
            </Button>
          </ListItem>
        </List>

        <Divider variant="middle" />
      </Drawer>

      <CreateModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
    </>
  );
};

export default Sidebar;
