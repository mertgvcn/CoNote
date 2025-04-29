import { StructureType } from "../enums/StructureType";


export interface StructureView {
    id: number;
    name: string;
    description?: string;
    createdAt: Date;
    createdAtHumanized: string;
    type: StructureType
}