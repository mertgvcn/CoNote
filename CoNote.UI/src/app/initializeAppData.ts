import { AppDispatch } from "./store";
import { validateToken } from "../features/auth/authSlice";
import { getCurrentUserWorkspaces } from "../features/workspace/workspaceSlice";

export const initializeAppData = () => async (dispatch: AppDispatch) => {
  const isAuthenticated = (await dispatch(validateToken())).payload;
  if (!isAuthenticated) return;

  //Uygulama açıldığında çekilmesi gereken veriler
  await dispatch(getCurrentUserWorkspaces());
};
