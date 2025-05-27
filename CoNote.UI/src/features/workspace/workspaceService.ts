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

export const GetStructureByWorkspaceAndSectionId = async (
  workspaceId: number,
  sectionId?: number
) => {
  try {
    var response = await WorkspaceAPI.GetStructureByWorkspaceAndSectionId(
      workspaceId,
      sectionId
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      RenderErrorToast(error.response.data.Message);
    } else {
      RenderErrorToast(
        "An error occurred while fetching structure of workspace."
      );
    }
    throw error;
  }
};

export const GetMembersByWorkspaceId = async (workspaceId: number) => {
  try {
    var response = await WorkspaceAPI.GetMembersByWorkspaceId(workspaceId);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      RenderErrorToast(error.response.data.Message);
    } else {
      RenderErrorToast(
        "An error occurred while fetching members of workspace."
      );
    }
    throw error;
  }
};

export const GetInvitationsByWorkspaceId = async (workspaceId: number) => {
  try {
    var response = await WorkspaceAPI.GetInvitationsByWorkspaceId(workspaceId);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      RenderErrorToast(error.response.data.Message);
    } else {
      RenderErrorToast(
        "An error occurred while fetching invitations of workspace."
      );
    }
    throw error;
  }
};

export const GetSettingsByWorkspaceId = async (workspaceId: number) => {
  try {
    var response = await WorkspaceAPI.GetSettingsByWorkspaceId(workspaceId);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      RenderErrorToast(error.response.data.Message);
    } else {
      RenderErrorToast(
        "An error occurred while fetching settings of workspace."
      );
    }
    throw error;
  }
};

export const GetRolesByWorkspaceId = async (workspaceId: number) => {
  try {
    var response = await WorkspaceAPI.GetRolesByWorkspaceId(workspaceId);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      RenderErrorToast(error.response.data.Message);
    } else {
      RenderErrorToast("An error occurred while fetching roles of workspace.");
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
    await store.dispatch(getCurrentUserWorkspaces());
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

export const SearchWorkspacesByName = async (
  searchValue: string,
  limit?: number
) => {
  try {
    var response = await WorkspaceAPI.SearchWorkspacesByName(
      searchValue,
      limit
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

export const workspaceService = {
  GetCurrentUserWorkspaces,
  GetStructureByWorkspaceAndSectionId,
  GetMembersByWorkspaceId,
  GetInvitationsByWorkspaceId,
  GetSettingsByWorkspaceId,
  GetRolesByWorkspaceId,
  CreateWorkspace,
  SearchWorkspacesByName,
};
