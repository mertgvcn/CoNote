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
    //TODO: Bu kısımda verilerin await ile sırayla çekilmesi mi gerekir? aynı anda çekmek sorun yaratır mı?
    dispatch(getStructureByWorkspaceAndSectionId({ workspaceId }));
    dispatch(getMembersByWorkspaceId(workspaceId));
    dispatch(getInvitationsByWorkspaceId(workspaceId));
    dispatch(getSettingsByWorkspaceId(workspaceId));
  }, [dispatch, workspaceId]);
};
