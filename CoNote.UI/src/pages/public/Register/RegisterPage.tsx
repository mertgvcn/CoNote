import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { UserRegisterRequest } from "../../../api/Authentication/models/UserRegisterRequest";

import {
  Box,
  Button,
  Container,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { authService } from "../../../features/auth/authService";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Navbar from "../../../components/layout/Navbar";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserRegisterRequest>({
    FirstName: "",
    LastName: "",
    Email: "",
    Username: "",
    Password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState<string>("");
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

    if (
      !formData.FirstName ||
      !formData.LastName ||
      !formData.Email ||
      !formData.Username ||
      !formData.Password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.Password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await authService.register(formData);
      navigate("/login");
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
      <Navbar isAuthenticated={false} />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 64px)"
        bgcolor="background.default"
      >
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography
              variant="h4"
              align="center"
              color="primary"
              fontWeight={600}
              mb={3}
            >
              Register
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                label="First Name"
                name="FirstName"
                value={formData.FirstName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: "primary.main" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Last Name"
                name="LastName"
                value={formData.LastName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: "primary.main" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Username"
                name="Username"
                value={formData.Username}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: "primary.main" }} />
                    </InputAdornment>
                  ),
                }}
              />

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

              <TextField
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                Register
              </Button>

              <Button
                fullWidth
                component={RouterLink}
                to="/login"
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
                Back to Login
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default RegisterPage;
