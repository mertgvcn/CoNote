//redux
import { AppDispatch, store } from "../../app/store";
import {
  endSession,
  setIsAppInitialized,
  validateToken,
} from "./slices/authSlice";
import { getCurrentUserWorkspaces } from "../workspace/slices/workspaceSlice";
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
import { getCurrentUserNotifications } from "../notification/slices/notificationSlice";

const login = async (params: LoginForm) => {
  const userLoginRequest: UserLoginRequest = {
    email: params.email.trim(),
    password: params.password,
  };

  try {
    const response = await AuthenticationAPI.Login(userLoginRequest);
    const data: UserLoginResponse = response.data;
    setCookie("access_token", data.accessToken, data.accessTokenExpireDate);
    await store.dispatch(validateToken());
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

const initializeAppData = () => async (dispatch: AppDispatch) => {
  const isAuthenticated = (await dispatch(validateToken())).payload;

  if (isAuthenticated) {
    await dispatch(getCurrentUserWorkspaces());
    await dispatch(getCurrentUserNotifications())
  }
  
  dispatch(setIsAppInitialized(true));
};

export const authService = {
  login,
  register,
  logout,
  isAuthenticated,
  initializeAppData,
};
