export interface CreateSectionRequest {
  name: string;
  description: string;
  workspaceId: number;
  parentId?: number;
}
