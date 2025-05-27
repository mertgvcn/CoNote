import { useEffect } from "react";
//redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import {
  getInvitationsByWorkspaceId,
  getMembersByWorkspaceId,
  getRolesByWorkspaceId,
  getSettingsByWorkspaceId,
  getStructureByWorkspaceAndSectionId,
} from "../slices/workspaceDetailsSlice";

export const useWorkspaceDetails = (workspaceId: number) => {
  const dispatch = useDispatch<AppDispatch>();

  const fetchData = async () => {
    await dispatch(getStructureByWorkspaceAndSectionId({ workspaceId }));
    await dispatch(getMembersByWorkspaceId(workspaceId));
    await dispatch(getInvitationsByWorkspaceId(workspaceId));
    await dispatch(getSettingsByWorkspaceId(workspaceId));
    await dispatch(getRolesByWorkspaceId(workspaceId));
  };

  useEffect(() => {
    if (!workspaceId) return;

    fetchData();
  }, [workspaceId]);
};
