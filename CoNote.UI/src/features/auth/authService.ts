//redux
import { store } from "../../app/store";
import { endSession, validateToken } from "./authSlice";
//utils
import { deleteCookie, getCookie, setCookie } from "../../utils/CookieManager";
import AuthenticationAPI from "../../api/Authentication/AuthenticationAPI";
import {
  RenderErrorToast,
  RenderSuccessToast,
} from "../../utils/CustomToastManager";
//models
import { LoginForm } from "./models/LoginForm";
import { RegisterForm } from "./models/RegisterForm";
import { UserLoginRequest } from "../../api/Authentication/models/UserLoginRequest";
import { UserLoginResponse } from "../../api/Authentication/models/UserLoginResponse";
import { UserRegisterRequest } from "../../api/Authentication/models/UserRegisterRequest";

const login = async (params: LoginForm) => {
  const userLoginRequest: UserLoginRequest = {
    email: params.email.trim(),
    password: params.password,
  };

  try {
    const response = await AuthenticationAPI.Login(userLoginRequest);
    const data: UserLoginResponse = response.data;
    setCookie("access_token", data.accessToken, data.accessTokenExpireDate);
    store.dispatch(validateToken());
    RenderSuccessToast("Login successful.");
  } catch (error: any) {
    //TODO: any değiştir
    if (error.response) {
      RenderErrorToast(error.response.data.Message);
    } else {
      RenderErrorToast("An error occurred.");
    }
    throw error;
  }
};

const register = async (params: RegisterForm) => {
  const userRegisterRequest: UserRegisterRequest = {
    firstName: params.firstName.trim(),
    lastName: params.lastName.trim(),
    username: params.username.trim(),
    email: params.email.trim(),
    password: params.password,
  };

  try {
    await AuthenticationAPI.Register(userRegisterRequest);
    RenderSuccessToast("Registration successful.");
  } catch (error: any) {
    //TODO: any değiştir
    if (error.response) {
      RenderErrorToast(error.response.data.Message);
    } else {
      RenderErrorToast("An error occurred.");
    }
    throw error;
  }
};

const logout = (): void => {
  deleteCookie("access_token");
  store.dispatch(endSession());
  window.location.href = "/login";
};

const isAuthenticated = async (): Promise<boolean> => {
  const token = getCookie("access_token");
  if (!token) return false;

  try {
    await AuthenticationAPI.ValidateToken();
    return true;
  } catch {
    deleteCookie("access_token");
    return false;
  }
};

export const authService = {
  login,
  register,
  logout,
  isAuthenticated,
};
