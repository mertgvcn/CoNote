import { AxiosResponse } from "axios";
import { BaseAPI } from "../BaseAPI";
//models
import { CreateWorksheetRequest } from "./models/CreateWorksheetRequest";

class WorksheetAPI extends BaseAPI {
  private controllerExtension: string = "/api/Worksheet";

  constructor() {
    super();
  }

  public async CreateWorksheet(
    params: CreateWorksheetRequest
  ): Promise<AxiosResponse> {
    return await this.post(
      this.controllerExtension + "/CreateWorksheet",
      params
    );
  }
}

export default new WorksheetAPI();
