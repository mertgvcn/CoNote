import { ComponentType } from "../enums/ComponentType";

export interface StyleProperties {
  fillColor?: string;
  textColor?: string;
  fontSize?: string;
  fontFamily?: string;
  sides?: number;
  innerRadiusRatio?: number;
}

export interface ComponentView {
  id: number;
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
