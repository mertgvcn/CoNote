import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
//utils
import { authService } from "../../features/auth/authService";
//components
import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { LocalLibrary } from "@mui/icons-material";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isAuthenticated = authService.isAuthenticated();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        borderBottom: scrolled ? `1px solid ${theme.palette.divider}` : "none",
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <Toolbar sx={{ gap: 4 }}>
          <Link href="/" underline="none">
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ cursor: "pointer" }}
            >
              <LocalLibrary color="primary" />
              <Typography variant="h6" color="primary" fontWeight={600}>
                CoNote
              </Typography>
            </Stack>
          </Link>

          <Stack direction="row" spacing={2} alignItems="center" flex={1}>
            {isAuthenticated && (
              <>
                <Typography variant="h6" color="secondary" fontWeight={600}>
                  Dashboard
                </Typography>
                <Typography variant="h6" color="secondary" fontWeight={600}>
                  Workspaces
                </Typography>
                <Button variant="contained" color="secondary">
                  Create
                </Button>
              </>
            )}
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
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
              <Button color="error" variant="contained" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
