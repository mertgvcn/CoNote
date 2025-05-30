//utils
import NotificationAPI from "../../api/Notification/NotificationAPI";
import { RenderErrorToast, RenderSuccessToast } from "../../utils/CustomToastManager";
//models
import { MarkNotificationAsReadRequest } from "../../api/Notification/models/MarkNotificationAsReadRequest";

export const GetCurrentUserNotifications = async () => {
  try {
    var response = await NotificationAPI.GetCurrentUserNotifications();
    return response.data;
  } catch (error: any) {
    if (error.response) {
      RenderErrorToast(error.response.data.Message);
    } else {
      RenderErrorToast("An error occurred while fetching notifications.");
    }
    throw error;
  }
};

export const MarkNotificationsAsRead = async (
  request: MarkNotificationAsReadRequest
) => {
  try {
    var response = await NotificationAPI.MarkNotificationsAsRead(request);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      RenderErrorToast(error.response.data.Message);
    } else {
      RenderErrorToast(
        "An error occurred while marking notifications as read."
      );
    }
    throw error;
  }
};

export const DeleteNotification = async (
  notificationId: number
) => {
  try {
    var response = await NotificationAPI.DeleteNotification(notificationId);
    RenderSuccessToast("Notification deleted successfully.")
    return response.data;
  } catch (error: any) {
    if (error.response) {
      RenderErrorToast(error.response.data.Message);
    } else {
      RenderErrorToast(
        "An error occurred while deleting notification."
      );
    }
    throw error;
  }
};

export const notificationService = {
  GetCurrentUserNotifications,
  MarkNotificationsAsRead,
  DeleteNotification
};
