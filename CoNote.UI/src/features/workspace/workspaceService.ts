//redux
import { store } from "../../app/store";
import { getCurrentUserWorkspaces } from "./slices/workspaceSlice";
//utils
import WorkspaceAPI from "../../api/Workspace/WorkspaceAPI";
import {
  RenderErrorToast,
  RenderSuccessToast,
} from "../../utils/CustomToastManager";
//models
import { CreateWorkspaceForm } from "./models/CreateWorkspaceForm";
import { CreateWorkspaceRequest } from "../../api/Workspace/models/CreateWorkspaceRequest";

export const GetCurrentUserWorkspaces = async () => {
  try {
    var response = await WorkspaceAPI.GetCurrentUserWorkspaces();
    return response.data;
  } catch (error: any) {
    if (error.response) {
      RenderErrorToast(error.response.data.Message);
    } else {
      RenderErrorToast("An error occurred while fetching workspaces.");
    }
    throw error;
  }
};

export const CreateWorkspace = async (params: CreateWorkspaceForm) => {
  //TODO: Buraya mapping eklenebilir
  var createWorkspaceRequest: CreateWorkspaceRequest = {
    name: params.name,
    description: params.description,
  };

  try {
    await WorkspaceAPI.CreateWorkspace(createWorkspaceRequest);
    await store.dispatch(getCurrentUserWorkspaces())
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
  GetCurrentUserWorkspaces,
  CreateWorkspace,
};
