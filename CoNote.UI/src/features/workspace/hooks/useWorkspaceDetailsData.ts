import { useEffect } from "react";
//redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import {
  getInvitationsByWorkspaceId,
  getMembersByWorkspaceId,
  getSettingsByWorkspaceId,
  getStructureByWorkspaceAndSectionId,
} from "../slices/workspaceDetailsSlice";

export const useWorkspaceDetails = (workspaceId: number) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!workspaceId) return;

    dispatch(getStructureByWorkspaceAndSectionId({ workspaceId }));
    dispatch(getMembersByWorkspaceId(workspaceId));
    dispatch(getInvitationsByWorkspaceId(workspaceId));
    dispatch(getSettingsByWorkspaceId(workspaceId));
  }, [dispatch, workspaceId]);
};
