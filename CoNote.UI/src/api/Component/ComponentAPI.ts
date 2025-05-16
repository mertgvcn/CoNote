import { AxiosResponse } from "axios";
import { BaseAPI } from "../BaseAPI";
//models
import { CreateComponentRequest } from "./models/CreateComponentRequest";

class ComponentAPI extends BaseAPI {
  private controllerExtension: string = "/api/Component";

  constructor() {
    super();
  }

  public async GetComponentsByWorksheetId(
    worksheetId: number
  ): Promise<AxiosResponse> {
    return await this.get(
      this.controllerExtension + "/GetComponentsByWorksheetId",
      { worksheetId }
    );
  }

  public async CreateComponent(
    params: CreateComponentRequest
  ): Promise<AxiosResponse> {
    return await this.post(
      this.controllerExtension + "/CreateComponent",
      params
    );
  }

  public async DeleteComponent(componentId: number): Promise<AxiosResponse> {
    return await this.delete(this.controllerExtension + "/DeleteComponent", {
      componentId,
    });
  }
}

export default new ComponentAPI();
