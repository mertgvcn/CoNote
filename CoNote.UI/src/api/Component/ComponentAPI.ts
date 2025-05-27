import { AxiosResponse } from "axios";
import { BaseAPI } from "../BaseAPI";
//models
import { CreateComponentRequest } from "./models/CreateComponentRequest";
import { UpdateComponentRequest } from "./models/UpdateComponentRequest";

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
    request: CreateComponentRequest
  ): Promise<AxiosResponse> {
    return await this.post(
      this.controllerExtension + "/CreateComponent",
      request
    );
  }

  public async UpdateComponent(
    request: UpdateComponentRequest
  ): Promise<AxiosResponse> {
    return await this.put(
      this.controllerExtension + "/UpdateComponent",
      request
    );
  }

  public async DeleteComponent(componentId: number): Promise<AxiosResponse> {
    return await this.delete(this.controllerExtension + "/DeleteComponent", {
      componentId,
    });
  }
}

export default new ComponentAPI();
