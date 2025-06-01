//redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//utils
import { permissionService } from "../permissionService";
//models
import { PermissionView } from "../../../models/views/PermissionView";
import { RootState } from "../../../app/store";

interface PermissionInitialStateType {
  permissions: PermissionView[];
  loading: boolean;
}

export const permissionInitialState: PermissionInitialStateType = {
  permissions: [],
  loading: false,
};

export const getCurrentUserPermissionsByWorkspaceId = createAsyncThunk(
  "permission/getCurrentUserPermissionsByWorkspaceId",
  async (workspaceId: number) => {
    return await permissionService.GetCurrentUserPermissionsByWorkspaceId(workspaceId);
  }
);

const permissionSlice = createSlice({
  name: "permission",
  initialState: permissionInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUserPermissionsByWorkspaceId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUserPermissionsByWorkspaceId.fulfilled, (state, action) => {
        state.loading = false;
        state.permissions = action.payload;
      })
      .addCase(getCurrentUserPermissionsByWorkspaceId.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectPermissions = (state: RootState) =>
  state.permission.permissions;
export const selectPermissionsLoading = (state: RootState) =>
  state.permission.loading;

export const {} = permissionSlice.actions;
export default permissionSlice.reducer;