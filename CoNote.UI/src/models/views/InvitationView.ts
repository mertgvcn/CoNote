import { InvitationStatus } from "../enums/InvitationStatus";
import { InvitationType } from "../enums/InvitationType";


export interface InvitationView {
 id: number;
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