//utils
import WorkspaceAPI from "../../api/Workspace/WorkspaceAPI";
import {
  RenderErrorToast,
  RenderSuccessToast,
} from "../../utils/CustomToastManager";
//models
import { CreateWorkspaceForm } from "./models/CreateWorkspaceForm";
import { CreateWorkspaceRequest } from "../../api/Workspace/models/CreateWorkspaceRequest";

export const CreateWorkspace = async (params: CreateWorkspaceForm) => {
  var createWorkspaceRequest: CreateWorkspaceRequest = {
    name: params.name,
    description: params.description,
  };

  try {
    await WorkspaceAPI.CreateWorkspace(createWorkspaceRequest);
    RenderSuccessToast("Workspace created.");
  } catch (error: any) {
    if (error.response) {
      RenderErrorToast(error.response.data.Message);
    } else {
      RenderErrorToast("An error occurred.");
    }
    throw error;
  }
};

export const workspaceService = {
  CreateWorkspace,
};