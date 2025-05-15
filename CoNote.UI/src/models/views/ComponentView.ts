import { ComponentType } from "../enums/ComponentType";

export interface ComponentView {
    id?: number;
    width?: number;
    height?: number;
    zIndex?: number;
    x?: number;
    y?: number;
    rotation?: number;
    type?: ComponentType;
    content?: string;
    style?: string;
}