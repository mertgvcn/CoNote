import { ComponentType } from "../../../models/enums/ComponentType";
import { StyleProperties } from "../../../models/views/ComponentView";

export interface CreateComponentRequest {
  worksheetId: number;
  width: number;
  height: number;
  zIndex: number;
  x: number;
  y: number;
  rotation: number;
  type: ComponentType;
  content?: string;
  style?: StyleProperties;
}
