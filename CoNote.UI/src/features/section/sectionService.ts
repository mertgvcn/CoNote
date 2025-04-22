//utils
import SectionAPI from "../../api/Section/SectionAPI";
import {
  RenderSuccessToast,
  RenderErrorToast,
} from "../../utils/CustomToastManager";
//models
import { CreateSectionForm } from "./models/CreateSectionForm";
import { CreateSectionRequest } from "../../api/Section/models/CreateSectionRequest";

export const GetSectionTreeByWorkspaceId = async (workspaceId: number) => {
  try {
    const response = await SectionAPI.GetSectionTreeByWorkspaceId(workspaceId);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      RenderErrorToast(error.response.data.Message);
    } else {
      RenderErrorToast("An error occurred while fetching sections.");
    }
  }
};

export const CreateSection = async (params: CreateSectionForm) => {
  var createSectionRequest: CreateSectionRequest = {
    name: params.name,
    description: params.description,
    workspaceId: params.workspaceId,
    parentId: params.parentId,
  };

  try {
    await SectionAPI.CreateSection(createSectionRequest);
    RenderSuccessToast("Section created.");
  } catch (error: any) {
    if (error.response) {
      RenderErrorToast(error.response.data.Message);
    } else {
      RenderErrorToast("An error occurred.");
    }
    throw error;
  }
};

export const sectionService = {
  GetSectionTreeByWorkspaceId,
  CreateSection,
};
