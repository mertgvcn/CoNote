import { deleteCookie, getCookie } from "../../utils/CookieManager";

export const isAuthenticated = (): boolean => {
  return !!getCookie("access_token");
};

export const logout = (): void => {
  deleteCookie("access_token");
  window.location.href = "/login";
};