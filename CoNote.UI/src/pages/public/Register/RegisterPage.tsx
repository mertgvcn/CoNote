import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
//models
import { UserRegisterRequest } from "../../../api/Authentication/models/UserRegisterRequest";
//utils
import { authService } from "../../../features/auth/authService";
//icons
import { AccountBox, Email, Lock, Person } from "@mui/icons-material";
//components
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    await authService.register(formData);
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }} >
      <Stack direction="column" minWidth={320} paddingX={2} width={400}>
        <Stack direction="column" mt={10}>
          <Typography variant="h5" fontWeight="bold" color="textSecondary">
            Think it. Make it.
          </Typography>
          <Typography variant="h5" fontWeight="bold" color="textDisabled">
            Join to our CoNote community.
          </Typography>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Stack direction="column" gap={3} mt={4}>
            <TextField
              label="First Name"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              fullWidth
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Last Name"
              name="LastName"
              value={formData.LastName}
              onChange={handleChange}
              fullWidth
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Username"
              name="Username"
              value={formData.Username}
              onChange={handleChange}
              fullWidth
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBox />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              fullWidth
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Password"
              name="Password"
              type="password"
              value={formData.Password}
              onChange={handleChange}
              fullWidth
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Stack>

          <Stack direction="column" gap={1} mt={4}>
            <Button type="submit" fullWidth size="medium" variant="contained">
              Register
            </Button>

            <Button
              fullWidth
              component={RouterLink}
              to="/login"
              size="medium"
              variant="text"
            >
              I already have an account
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default RegisterPage;
