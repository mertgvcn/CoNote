import { InvitationStatus } from "../enums/InvitationStatus";
import { InvitationType } from "../enums/InvitationType";

export interface InvitationView {
  id: number;
  createdAt: Date;
  createdAtHumanized: string;
  workspaceId: number;
  workspaceName: string;
  senderId: number;
  senderFullName: string;
  senderEmail: string;
  senderUsername: string;
  receiverId?: number;
  receiverFullName?: string;
  receiverEmail?: string;
  receiverUsername?: string;
  roleId: number;
  roleName: string;
  type: InvitationType;
  status: InvitationStatus;
}
