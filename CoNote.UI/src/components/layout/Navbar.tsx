import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { authService } from "../../features/auth/authService";

interface NavbarProps {
  isAuthenticated: boolean;
}

const Navbar = ({ isAuthenticated }: NavbarProps) => {
  const handleLogout = () => {
    authService.logout();
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "common.white",
        boxShadow: "none",
      }}
      elevation={0}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to={isAuthenticated ? "/dashboard" : "/"}
          color="primary.main"
          fontWeight={600}
          sx={{ textDecoration: "none", cursor: "pointer" }}
        >
          CoNote
        </Typography>

        <Box display="flex" gap={2}>
          {isAuthenticated ? (
            <Button
              onClick={handleLogout}
              sx={{
                backgroundColor: "error.main",
                color: "common.white",
                "&:hover": {
                  backgroundColor: "error.dark",
                },
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                component={RouterLink}
                to="/login"
                sx={{
                  backgroundColor: "primary.main",
                  color: "common.white",
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                }}
              >
                Sign In
              </Button>

              <Button
                component={RouterLink}
                to="/register"
                sx={{
                  backgroundColor: "secondary.main",
                  color: "common.white",
                  "&:hover": {
                    backgroundColor: "secondary.light",
                  },
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
