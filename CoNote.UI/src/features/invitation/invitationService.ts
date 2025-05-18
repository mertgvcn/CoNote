//utils
import InvitationAPI from "../../api/Invitation/InvitationAPI";
import {
  RenderErrorToast,
  RenderSuccessToast,
} from "../../utils/CustomToastManager";
//models
import { SendInvitationRequest } from "../../api/Invitation/models/SendInvitationRequest";

export const SendInvitation = async (request: SendInvitationRequest) => {
  try {
    var response = await InvitationAPI.SendInvitation(request);
    RenderSuccessToast("Invitation sent successfully");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      RenderErrorToast(error.response.data.Message);
    } else {
      RenderErrorToast("An error occurred while sending invitation.");
    }
    throw error;
  }
};

export const invitationService = {
  SendInvitation,
};
