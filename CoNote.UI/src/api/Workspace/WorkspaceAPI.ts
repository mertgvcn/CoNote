import { AxiosResponse } from "axios";
import { BaseAPI } from "../BaseAPI";
//models
import { CreateWorkspaceRequest } from "./models/CreateWorkspaceRequest";

class WorkspaceAPI extends BaseAPI {
  private controllerExtension: string = "/api/Workspace";

  constructor() {
    super();
  }

  public async GetCurrentUserWorkspaces(): Promise<AxiosResponse> {
    return await this.get(
      this.controllerExtension + "/GetCurrentUserWorkspaces"
    );
  }

  public async CreateWorkspace(
    params: CreateWorkspaceRequest
  ): Promise<AxiosResponse> {
    return await this.post(
      this.controllerExtension + "/CreateWorkspace",
      params
    );
  }
}

export default new WorkspaceAPI();
