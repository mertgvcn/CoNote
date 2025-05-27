//utils
import WorkspaceMemberAPI from "../../api/WorkspaceMember/WorkspaceMemberAPI";
import {
  RenderSuccessToast,
  RenderErrorToast,
} from "../../utils/CustomToastManager";
//models
import { AddMemberToWorkspaceRequest } from "../../api/WorkspaceMember/models/AddMemberToWorkspaceRequest";

export const AddMemberToWorkspace = async (
  request: AddMemberToWorkspaceRequest
) => {
  try {
    await WorkspaceMemberAPI.AddMemberToWorkspace(request);
  } catch (error: any) {
    if (error.response) {
      RenderErrorToast(error.response.data.Message);
    } else {
      RenderErrorToast("An error occurred.");
    }
    throw error;
  }
};

export const workspaceMemberService = {
  AddMemberToWorkspace,
};
