import { AxiosResponse } from "axios";
import { BaseAPI } from "../BaseAPI";
//models+
import { AddMemberToWorkspaceRequest } from "./models/AddMemberToWorkspaceRequest";

class WorkspaceMemberAPI extends BaseAPI {
  private controllerExtension: string = "/api/WorkspaceMember";

  constructor() {
    super();
  }

  public async AddMemberToWorkspace(
    request: AddMemberToWorkspaceRequest
  ): Promise<AxiosResponse> {
    return await this.post(
      this.controllerExtension + "/AddMemberToWorkspace",
      request
    );
  }
}

export default new WorkspaceMemberAPI();
