//utils
import PermissionAPI from "../../api/Permission/PermissionAPI";
import { RenderErrorToast } from "../../utils/CustomToastManager";

export const GetCurrentUserPermissionsByWorkspaceId = async (
  workspaceId: number
) => {
  try {
    var response = await PermissionAPI.GetCurrentUserPermissionsByWorkspaceId(
      workspaceId
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      RenderErrorToast(error.response.data.Message);
    } else {
      RenderErrorToast("An error occurred.");
    }
    throw error;
  }
};

export const permissionService = {
  GetCurrentUserPermissionsByWorkspaceId,
};
