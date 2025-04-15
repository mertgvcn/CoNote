import * as Yup from "yup";
import { LoginForm } from "../models/LoginForm";

export const LoginFormSchema: Yup.ObjectSchema<LoginForm> = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
