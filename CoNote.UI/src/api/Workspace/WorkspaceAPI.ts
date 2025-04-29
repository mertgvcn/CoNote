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

  public async GetStructureByWorkspaceAndSectionId(
    workspaceId: number,
    sectionId?: number
  ): Promise<AxiosResponse> {
    return await this.get(
      this.controllerExtension + "/GetStructureByWorkspaceAndSectionId",
      { workspaceId, sectionId }
    );
  }

  public async GetMembersByWorkspaceId(
    workspaceId: number
  ): Promise<AxiosResponse> {
    return await this.get(
      this.controllerExtension + "/GetMembersByWorkspaceId",
      { workspaceId }
    );
  }

  public async GetInvitationsByWorkspaceId(
    workspaceId: number
  ): Promise<AxiosResponse> {
    return await this.get(
      this.controllerExtension + "/GetInvitationsByWorkspaceId",
      { workspaceId }
    );
  }

  public async GetSettingsByWorkspaceId(
    workspaceId: number
  ): Promise<AxiosResponse> {
    return await this.get(
      this.controllerExtension + "/GetSettingsByWorkspaceId",
      { workspaceId }
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
