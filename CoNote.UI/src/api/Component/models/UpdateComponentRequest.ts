import { StyleProperties } from "../../../models/views/ComponentView";

export interface UpdateComponentRequest {
  id: number;
  width: number;
  height: number;
  zIndex: number;
  x: number;
  y: number;
  rotation: number;
  content?: string;
  style?: StyleProperties;
}
