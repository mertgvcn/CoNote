import { AxiosResponse } from "axios";
import { BaseAPI } from "../BaseAPI";
//models
import { CreateComponentRequest } from "./models/CreateComponentRequest";

class ComponentAPI extends BaseAPI {
  private controllerExtension: string = "/api/Component";

  constructor() {
    super();
  }

  public async CreateComponent(
    params: CreateComponentRequest
  ): Promise<AxiosResponse> {
    return await this.post(
      this.controllerExtension + "/CreateComponent",
      params
    );
  }
}

export default new ComponentAPI();
