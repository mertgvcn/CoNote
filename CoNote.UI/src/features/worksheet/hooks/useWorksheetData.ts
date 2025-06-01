import { useEffect } from "react";
//redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { getSettingsByWorksheetId } from "../slices/worksheetSlice";
import { getCurrentUserPermissionsByWorkspaceId } from "../../permission/slices/permissionSlice";
//hooks
import useHasPermission from "../../permission/hooks/useHasPermission";
//models
import { PermissionAction } from "../../../models/enums/PermissionAction";
import { PermissionObjectType } from "../../../models/enums/PermissionObjectType";

export const useWorksheetData = (workspaceId: number, worksheetId: number) => {
  const dispatch = useDispatch<AppDispatch>();

  const canViewWorksheet = useHasPermission(
    PermissionAction.View,
    PermissionObjectType.Worksheet
  );

  const fetchData = async () => {
    await dispatch(getCurrentUserPermissionsByWorkspaceId(workspaceId));

    if (canViewWorksheet) {
      await dispatch(getSettingsByWorksheetId(worksheetId));
    }
  };

  useEffect(() => {
    if (!worksheetId) return;
    fetchData();
  }, [worksheetId]);
};
