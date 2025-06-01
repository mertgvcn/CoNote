import { PermissionAction } from "../enums/PermissionAction";
import { PermissionObjectType } from "../enums/PermissionObjectType";

export interface PermissionView {
    action: PermissionAction,
    objectType: PermissionObjectType
}