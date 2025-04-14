import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { UserLoginRequest } from "../../../api/Authentication/models/UserLoginRequest";
import { authService } from "../../../features/auth/authService";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserLoginRequest>({
    Email: "",
    Password: "",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await authService.login(formData);
      navigate("/dashboard");
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.Message) {
        setError(err.response.data.Message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 64px)"
        bgcolor="background.default"
      >
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ p: 4, position: "relative" }}>
            <Typography
              variant="h4"
              align="center"
              color="primary"
              fontWeight={600}
              mb={3}
            >
              Login
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: "primary.main" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Password"
                name="Password"
                type="password"
                value={formData.Password}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "primary.main" }} />
                    </InputAdornment>
                  ),
                }}
              />

              {error && (
                <Typography color="error" mt={1}>
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                sx={{
                  mt: 2,
                  height: "56px",
                  backgroundColor: "primary.main",
                  color: "common.white",
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                }}
              >
                Login
              </Button>

              <Button
                fullWidth
                component={RouterLink}
                to="/register"
                sx={{
                  mt: 2,
                  height: "56px",
                  backgroundColor: "secondary.main",
                  color: "common.white",
                  "&:hover": {
                    backgroundColor: "secondary.light",
                  },
                }}
              >
                Create Account
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default LoginPage;
