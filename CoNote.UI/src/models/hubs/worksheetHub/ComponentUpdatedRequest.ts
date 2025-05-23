import { ComponentView } from "../../views/ComponentView";

export interface ComponentUpdatedRequest {
  worksheetId: number;
  component: ComponentView;
}
