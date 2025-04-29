import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
//models
import { WorkspaceView } from "../models/WorkspaceView";
//utils
import { workspaceService } from "../workspaceService";

export const workspaceAdapter = createEntityAdapter({
  selectId: (workspace: WorkspaceView) => workspace.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const workspaceInitialState =
  workspaceAdapter.getInitialState({
    loading: false,
  });

export const getCurrentUserWorkspaces = createAsyncThunk(
  "workspace/getCurrentUserWorkspaces",
  async (_, thunkAPI) => {
    const result = await workspaceService.GetCurrentUserWorkspaces();
    return result;
  }
);

const workspaceSlice = createSlice({
  name: "workspace",
  initialState: workspaceInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUserWorkspaces.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUserWorkspaces.fulfilled, (state, action) => {
        state.loading = false;
        workspaceAdapter.setAll(state, action.payload);
      })
      .addCase(getCurrentUserWorkspaces.rejected, (state) => {
        state.loading = false;
      });
      //TODO: Buraya CreateWorkspace'i koyup fulfilled olunca addOne kullansak ne olur?
  },
});

export const workspaceSelectors = workspaceAdapter.getSelectors(
  (state: RootState) => state.workspace
);
export const selectWorkspaceLoading = (state: RootState) =>
  state.workspace.loading;

export const {} = workspaceSlice.actions;
export default workspaceSlice.reducer;
