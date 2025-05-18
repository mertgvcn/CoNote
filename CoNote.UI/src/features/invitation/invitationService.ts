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

export const DeleteInvitation = async (invitationId: number) => {
  try {
    var response = await InvitationAPI.DeleteInvitation(invitationId);
    RenderSuccessToast("Invitation deleted successfully");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      RenderErrorToast(error.response.data.Message);
    } else {
      RenderErrorToast("An error occurred while deleting invitation.");
    }
    throw error;
  }
};

export const GetCurrentUserInvitations = async () => {
  try {
    const response = await InvitationAPI.GetCurrentUserInvitations();
    return response.data; 
  } catch (error: any) {
    if (error.response) {
      RenderErrorToast(error.response.data.Message);
    } else {
      RenderErrorToast("An error occurred while fetching invitations.");
    }
    throw error;
  }
};


export const invitationService = {
  SendInvitation,
  DeleteInvitation,
  GetCurrentUserInvitations,
};
