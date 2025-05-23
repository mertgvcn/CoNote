//utils
import ComponentAPI from "../../api/Component/ComponentAPI";
import { RenderErrorToast } from "../../utils/CustomToastManager";
//models
import { CreateComponentRequest } from "../../api/Component/models/CreateComponentRequest";
import { UpdateComponentRequest } from "../../api/Component/models/UpdateComponentRequest";

export const GetComponentsByWorksheetId = async (worksheetId: number) => {
  try {
    var response = await ComponentAPI.GetComponentsByWorksheetId(worksheetId);
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

export const CreateComponent = async (request: CreateComponentRequest) => {
  try {
    var response = await ComponentAPI.CreateComponent(request);
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

export const UpdateComponent = async (request: UpdateComponentRequest) => {
  try {
    var response = await ComponentAPI.UpdateComponent(request);
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

export const DeleteComponent = async (componentId: number) => {
  try {
    var response = await ComponentAPI.DeleteComponent(componentId);
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

export const componentService = {
  GetComponentsByWorksheetId,
  CreateComponent,
  UpdateComponent,
  DeleteComponent,
};
