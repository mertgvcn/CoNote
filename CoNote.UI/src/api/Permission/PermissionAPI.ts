import { AxiosResponse } from "axios";
import { BaseAPI } from "../BaseAPI";

class PermissionAPI extends BaseAPI {
  private controllerExtension: string = "/api/Permission";

  constructor() {
    super();
  }

  public async GetCurrentUserPermissionsByWorkspaceId(
    workspaceId: number
  ): Promise<AxiosResponse> {
    return await this.get(
      this.controllerExtension + "/GetCurrentUserPermissionsByWorkspaceId",
      { workspaceId }
    );
  }
}

export default new PermissionAPI();