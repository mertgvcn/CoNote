import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
//models
import { UserLoginRequest } from "../../../api/Authentication/models/UserLoginRequest";
//utils
import { authService } from "../../../features/auth/authService";
//icons
import { Email, Lock } from "@mui/icons-material";
//components
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserLoginRequest>({
    Email: "",
    Password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await authService.login(formData);
    navigate("/dashboard");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Stack direction="column" minWidth={320} paddingX={2} width={400}>
        <Stack direction="column" mt={10}>
          <Typography variant="h5" fontWeight="bold" color="textSecondary">
            Think it. Make it.
          </Typography>
          <Typography variant="h5" fontWeight="bold" color="textDisabled">
            Log in to your CoNote account.
          </Typography>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Stack direction="column" gap={3} mt={4}>
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
          </Stack>

          <Stack direction="column" gap={1} mt={4}>
            <Button type="submit" fullWidth size="medium" variant="contained">
              Login
            </Button>

            <Button
              fullWidth
              component={RouterLink}
              to="/register"
              size="medium"
              variant="text"
            >
              I don't have an account
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default LoginPage;
