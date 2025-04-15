import { useNavigate, Link as RouterLink } from "react-router-dom";
//models
import { RegisterForm } from "../../../features/auth/models/RegisterForm";
//schemas
import { RegisterFormSchema } from "../../../features/auth/schemas/RegisterFormSchema";
//utils
import { authService } from "../../../features/auth/authService";
import toast from "react-hot-toast";
import { FormikHelpers, useFormik } from "formik";
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

  const handleRegister = async (
    values: RegisterForm,
    actions: FormikHelpers<RegisterForm>
  ) => {
    try {
      await authService.register(values);
      setTimeout(() => {
        actions.resetForm();
        navigate("/login");
      }, 2000);
    } catch (error: any) {}
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik<RegisterForm>({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegisterFormSchema,
    onSubmit: handleRegister,
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
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
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
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
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
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
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
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

            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
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
