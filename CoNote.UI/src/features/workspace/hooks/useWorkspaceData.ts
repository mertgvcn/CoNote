import { useEffect } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import {
  getCurrentUserWorkspaces,
  selectWorkspaceLoading,
  workspaceSelectors,
} from "../workspaceSlice";

export const useWorkspacesData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const workspaces = useSelector(workspaceSelectors.selectAll);
  const loading = useSelector(selectWorkspaceLoading);

  useEffect(() => {
    if (workspaces.length === 0) dispatch(getCurrentUserWorkspaces());
  }, [dispatch]);

  return { workspaces, loading };
};
