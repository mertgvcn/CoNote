import { AxiosResponse } from "axios";
import { BaseAPI } from "../BaseAPI";
//models
import { CreateSectionRequest } from "./models/CreateSectionRequest";

class SectionAPI extends BaseAPI {
  private controllerExtension: string = "/api/Section";

  constructor() {
    super();
  }

  public async GetSectionTreeByWorkspaceId(
    workspaceId: number
  ): Promise<AxiosResponse> {
    return await this.get(
      this.controllerExtension + "/GetSectionTreeByWorkspaceId",
      { workspaceId }
    );
  }

  public async CreateSection(
    params: CreateSectionRequest
  ): Promise<AxiosResponse> {
    return await this.post(this.controllerExtension + "/CreateSection", params);
  }
}

export default new SectionAPI();
