//utils
import ComponentAPI from "../../api/Component/ComponentAPI";
import { RenderErrorToast } from "../../utils/CustomToastManager";
//models
import { CreateComponentRequest } from "../../api/Component/models/CreateComponentRequest";

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

export const componentService = {
  CreateComponent,
};
