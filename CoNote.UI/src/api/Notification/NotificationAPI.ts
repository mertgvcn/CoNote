import { AxiosResponse } from "axios";
import { BaseAPI } from "../BaseAPI";
//models
import { MarkNotificationAsReadRequest } from "./models/MarkNotificationAsReadRequest";

class NotificationAPI extends BaseAPI {
  private controllerExtension: string = "/api/Notification";

  constructor() {
    super();
  }

  public async GetCurrentUserNotifications(): Promise<AxiosResponse> {
    return await this.get(
      this.controllerExtension + "/GetCurrentUserNotifications"
    );
  }

  public async MarkNotificationsAsRead(
    request: MarkNotificationAsReadRequest
  ): Promise<AxiosResponse> {
    return await this.post(
      this.controllerExtension + "/MarkNotificationsAsRead",
      request
    );
  }
}

export default new NotificationAPI();
