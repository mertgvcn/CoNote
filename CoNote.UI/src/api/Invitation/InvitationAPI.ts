import { AxiosResponse } from "axios";
import { BaseAPI } from "../BaseAPI";
//models
import { SendInvitationRequest } from "./models/SendInvitationRequest";
import { UpdateInvitationStatusRequest } from "./models/UpdateInvitationStatusRequest";

class InvitationAPI extends BaseAPI {
  private controllerExtension: string = "/api/Invitation";

  constructor() {
    super();
  }

  public async SendInvitation(
    request: SendInvitationRequest
  ): Promise<AxiosResponse> {
    return await this.post(
      this.controllerExtension + "/SendInvitation",
      request
    );
  }

  public async DeleteInvitation(invitationId: number): Promise<AxiosResponse> {
    return await this.delete(this.controllerExtension + "/DeleteInvitation", {
      invitationId,
    });
  }

  public async GetCurrentUserInvitations(): Promise<AxiosResponse> {
    return await this.get(
      this.controllerExtension + "/GetCurrentUserInvitations"
    );
  }

  public async UpdateInvitationStatus(
    request: UpdateInvitationStatusRequest
  ): Promise<AxiosResponse> {
    return await this.post(
      this.controllerExtension + "/UpdateInvitationStatus",
      request
    );
  }
}

export default new InvitationAPI();
