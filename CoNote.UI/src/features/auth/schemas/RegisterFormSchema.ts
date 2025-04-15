import * as Yup from "yup";
import { RegisterForm } from "../models/RegisterForm";
import { passwordRegex } from "../../../utils/Regex";

export const RegisterFormSchema: Yup.ObjectSchema<RegisterForm> = Yup.object({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("Last name is required"),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .matches(passwordRegex, {
      message:
        "Please enter at least 8 characters; and use 1 uppercase letter, 1 lowercase letter, 1 numeric digit",
    })
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm password is required"),
});
