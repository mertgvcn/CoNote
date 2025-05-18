import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
//utils
import { authService } from "../../../features/auth/authService";
//redux
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import {
  notificationSelectors,
} from "../../../features/notification/slices/notificationSlice";
//icons
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
//components
import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Stack,
  Menu,
  Toolbar,
  Typography,
  useTheme,
  MenuItem,
  ListItemIcon,
  Badge,
} from "@mui/material";
import NavSearchbar from "./components/NavSearchbar";
import IconButton from "../../ui/IconButton";
import NotificationsModal from "../../modals/NotificationsModal/NotificationsModal";

const Navbar = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  const theme = useTheme();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const notifications = useSelector(notificationSelectors.selectAll);
  const unreadNotificationCount = notifications.filter((n) => !n.isRead).length;

  const handleNotificationsClick = () => {
    setShowNotificationsModal(true);
  };

  const handleAccountSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    authService.logout();
    navigate("/");
  };

  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        elevation={0}
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="xl" disableGutters>
          <Toolbar sx={{ gap: { xs: 2, md: 4 } }}>
            <Link href="/" underline="none">
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ cursor: "pointer" }}
              >
                <LocalLibraryIcon color="primary" />
                <Typography variant="h6" color="primary" fontWeight={600}>
                  CoNote
                </Typography>
              </Stack>
            </Link>

            <Box display="flex" flex={1}>
              <Stack
                display={{ xs: "none", md: "flex" }}
                direction="row"
                spacing={2}
                alignItems="center"
              >
                {isAuthenticated && <></>}
              </Stack>
            </Box>

            <Stack
              display={{ xs: "none", md: "flex" }}
              direction="row"
              spacing={1}
              alignItems="center"
            >
              {!isAuthenticated && (
                <>
                  <Button component={RouterLink} to="/login" variant="text">
                    Log in
                  </Button>

                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                  >
                    Sign Up
                  </Button>
                </>
              )}
              {isAuthenticated && (
                <>
                  <NavSearchbar showTooltip />

                  <IconButton
                    size="small"
                    variant="outlined"
                    tooltipTitle="Notifications"
                    aria-label="notifications"
                    onClick={handleNotificationsClick}
                  >
                    {unreadNotificationCount === 0 ? (
                      <NotificationsIcon />
                    ) : (
                      <Badge
                        badgeContent={unreadNotificationCount}
                        color="secondary"
                      >
                        <NotificationsIcon />
                      </Badge>
                    )}
                  </IconButton>

                  <IconButton
                    size="small"
                    variant="outlined"
                    tooltipTitle="Account settings"
                    onClick={handleAccountSettingsClick}
                  >
                    <PersonIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    slotProps={{
                      paper: {
                        sx: {
                          overflow: "visible",
                          mt: 1.5,
                          "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 17,
                            width: 10,
                            height: 10,
                            bgcolor: "background.default",
                            borderLeft: `1px solid ${theme.palette.divider}`,
                            borderTop: `1px solid ${theme.palette.divider}`,
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      },
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <PersonIcon fontSize="small" />
                      </ListItemIcon>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <ManageAccountsIcon fontSize="small" />
                      </ListItemIcon>
                      Account Settings
                    </MenuItem>
                    <MenuItem
                      onClick={handleLogout}
                      sx={{ color: theme.palette.error.main }}
                    >
                      <ListItemIcon>
                        <LogoutIcon
                          fontSize="small"
                          sx={{ color: theme.palette.error.main }}
                        />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Stack>

            <Box display={{ xs: "block", md: "none" }}>
              <IconButton
                size="small"
                variant="outlined"
                tooltipTitle="Show menu"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <NotificationsModal
        open={showNotificationsModal}
        onClose={() => setShowNotificationsModal(false)}
      />
    </>
  );
};

export default Navbar;
