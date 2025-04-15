//utils
import { deleteCookie, getCookie, setCookie } from "../../utils/CookieManager";
import AuthenticationAPI from "../../api/Authentication/AuthenticationAPI";
import { RenderErrorToast, RenderSuccessToast } from "../../utils/CustomToastManager";
//models
import { LoginForm } from "./models/LoginForm";
import { RegisterForm } from "./models/RegisterForm";
import { UserLoginRequest } from "../../api/Authentication/models/UserLoginRequest";
import { UserLoginResponse } from "../../api/Authentication/models/UserLoginResponse";
import { UserRegisterRequest } from "../../api/Authentication/models/UserRegisterRequest";

const isAuthenticated = (): boolean => {
  return !!getCookie("access_token");
};

const login = async (params: LoginForm) => {
  const userLoginRequest: UserLoginRequest = {
    Email: params.email.trim(),
    Password: params.password,
  };

  try {
    const response = await AuthenticationAPI.Login(userLoginRequest);
    const data: UserLoginResponse = response.data;
    setCookie("access_token", data.AccessToken, data.AccessTokenExpireDate);  
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
    FirstName: params.firstName.trim(),
    LastName: params.lastName.trim(),
    Username: params.username.trim(),
    Email: params.email.trim(),
    Password: params.password,
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
  window.location.href = "/login";
};

export const authService = {
  login,
  register,
  logout,
  isAuthenticated,
};
