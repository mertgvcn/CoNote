import { ComponentType } from "../../../models/enums/ComponentType";

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
  style?: string;
}
