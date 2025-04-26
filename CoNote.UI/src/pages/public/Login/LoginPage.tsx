import { useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
//redux
import { useSelector } from "react-redux";
import {
  selectAuthIsAuthenticated,
  selectAuthLoading,
} from "../../../features/auth/slices/authSlice";
//models
import { LoginForm } from "../../../features/auth/models/LoginForm";
//schemas
import { LoginFormSchema } from "../../../features/auth/schemas/LoginFormSchema";
//utils
import { authService } from "../../../features/auth/authService";
import { FormikHelpers, useFormik } from "formik";
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
  const isAuthenticated = useSelector(selectAuthIsAuthenticated);
  const loading = useSelector(selectAuthLoading);

  const handleLogin = async (
    values: LoginForm,
    actions: FormikHelpers<LoginForm>
  ) => {
    try {
      await authService.login(values);
      actions.resetForm();
    } catch (error: any) {}
  };

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, loading]);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik<LoginForm>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginFormSchema,
    onSubmit: handleLogin,
  });

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
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
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
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
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
            <Button
              type="submit"
              fullWidth
              size="medium"
              variant="contained"
              disabled={isSubmitting}
            >
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
