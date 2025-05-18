import { InvitationStatus } from "../models/enums/InvitationStatus";

export const getChipColorByInvitationStatus = (
  status: InvitationStatus
): "warning" | "success" | "error" => {
  switch (status) {
    case InvitationStatus.Pending:
      return "warning";
    case InvitationStatus.Accepted:
      return "success";
    case InvitationStatus.Rejected:
      return "error";
    default:
      return "warning";
  }
};
