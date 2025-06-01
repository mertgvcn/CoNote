//redux
import { useSelector } from "react-redux";
import { selectPermissions } from "../slices/permissionSlice";
//models
import { PermissionAction } from "../../../models/enums/PermissionAction";
import { PermissionObjectType } from "../../../models/enums/PermissionObjectType";

const useHasPermission = (action: PermissionAction, objectType: PermissionObjectType) => {
  const permissions = useSelector(selectPermissions);

  return permissions.some(
    (permission) => permission.action === action && permission.objectType === objectType
  );
};

export default useHasPermission;