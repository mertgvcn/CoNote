import { AxiosResponse } from "axios";
import { BaseAPI } from "../BaseAPI";
//models
import { SendInvitationRequest } from "./models/SendInvitationRequest";

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
}

export default new InvitationAPI();
