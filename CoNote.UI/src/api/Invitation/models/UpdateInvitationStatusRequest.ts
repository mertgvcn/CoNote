import { InvitationStatus } from "../../../models/enums/InvitationStatus";

export interface UpdateInvitationStatusRequest {
  invitationId: number;
  status: InvitationStatus;
}
