import { ReactNode } from "react";
//redux
import { useSelector } from "react-redux";
import { selectPermissionsLoading } from "../../features/permission/slices/permissionSlice";
//hooks
import useHasPermission from "../../features/permission/hooks/useHasPermission";
//models
import { PermissionAction } from "../../models/enums/PermissionAction";
import { PermissionObjectType } from "../../models/enums/PermissionObjectType";
//components
import Loading from "./Loading";

type PermissionGatePropsType = {
  children: ReactNode;
  action: PermissionAction;
  objectType: PermissionObjectType;
};

const PermissionGate = ({
  children,
  action,
  objectType,
}: PermissionGatePropsType) => {
  const hasPermission = useHasPermission(action, objectType);
  const permissionsLoading = useSelector(selectPermissionsLoading);

  if (permissionsLoading) return <Loading />;

  if (!hasPermission) return null;

  return <>{children}</>;
};

export default PermissionGate;
