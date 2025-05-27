import { NotificationType } from "../enums/NotificationType";

export interface NotificationView {
  id: number;
  createdAt: Date;
  createdAtHumanized: string;
  message: string;
  isRead: boolean;
  type: NotificationType;
}
