//utils
import WorksheetAPI from "../../api/Worksheet/WorksheetAPI";
import {
  RenderSuccessToast,
  RenderErrorToast,
} from "../../utils/CustomToastManager";
//models
import { CreateWorksheetForm } from "./models/CreateWorksheetForm";
import { CreateWorksheetRequest } from "../../api/Worksheet/models/CreateWorksheetRequest";

export const CreateWorksheet = async (params: CreateWorksheetForm) => {
  var createWorksheetRequest: CreateWorksheetRequest = {
    name: params.name,
    description: params.description,
    workspaceId: params.workspaceId,
    sectionId: params.sectionId,
  };

  try {
    await WorksheetAPI.CreateWorksheet(createWorksheetRequest);
    RenderSuccessToast("Worksheet created.");
  } catch (error: any) {
    if (error.response) {
      RenderErrorToast(error.response.data.Message);
    } else {
      RenderErrorToast("An error occurred.");
    }
    throw error;
  }
};
