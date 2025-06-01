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
import { getCurrentUserPermissionsByWorkspaceId } from "../../permission/slices/permissionSlice";
//utils
import useHasPermission from "../../permission/hooks/useHasPermission";
//models
import { PermissionAction } from "../../../models/enums/PermissionAction";
import { PermissionObjectType } from "../../../models/enums/PermissionObjectType";

export const useWorkspaceDetails = (workspaceId: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const canViewStructure = useHasPermission(PermissionAction.View, PermissionObjectType.Structure);
  const canViewMembers = useHasPermission(PermissionAction.View, PermissionObjectType.Members);
  const canViewInvitations = useHasPermission(PermissionAction.View, PermissionObjectType.Invitations);
  const canViewSettings = useHasPermission(PermissionAction.View, PermissionObjectType.Settings);
  const canViewRoles = useHasPermission(PermissionAction.View, PermissionObjectType.Settings); //TODO: Add permission for role as well

  const fetchData = async () => {
    await dispatch(getCurrentUserPermissionsByWorkspaceId(workspaceId)); 

    if (canViewStructure) {
      await dispatch(getStructureByWorkspaceAndSectionId({ workspaceId }));
    }

    if (canViewMembers) {
      await dispatch(getMembersByWorkspaceId(workspaceId));
    }

    if (canViewInvitations) {
      await dispatch(getInvitationsByWorkspaceId(workspaceId));
    }

    if (canViewSettings) {
      await dispatch(getSettingsByWorkspaceId(workspaceId));
    }

    if (canViewRoles) {
      await dispatch(getRolesByWorkspaceId(workspaceId));
    }
  };

  useEffect(() => {
    if (!workspaceId) return;

    fetchData();
  }, [dispatch, workspaceId, canViewStructure, canViewMembers, canViewInvitations, canViewSettings, canViewRoles]);
};

export default useWorkspaceDetails;