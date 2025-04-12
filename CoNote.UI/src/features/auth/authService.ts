//utils
import { deleteCookie, getCookie, setCookie } from "../../utils/CookieManager";
import AuthenticationAPI from "../../api/Authentication/AuthenticationAPI";
//models
import { UserLoginRequest } from "../../api/Authentication/models/UserLoginRequest";
import { UserLoginResponse } from "../../api/Authentication/models/UserLoginResponse";

const isAuthenticated = (): boolean => {
  return !!getCookie("access_token");
};

const login = async (params: UserLoginRequest) => {
  const response = await AuthenticationAPI.Login(params);

  const data : UserLoginResponse = response.data;
  setCookie("access_token", data.AccessToken, data.AccessTokenExpireDate);

  return data;
};

const logout = (): void => {
  deleteCookie("access_token");
  window.location.href = "/login";
};

export const authService = {
  login,
  logout,
  isAuthenticated
};