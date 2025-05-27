import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
//models
import { WorksheetSettingsView } from "../../../models/views/WorksheetSettingsView";
//utils
import { worksheetService } from "../worksheetService";

interface WorksheetInitialStateType {
  settings: WorksheetSettingsView | null;
  loading: boolean;
}

export const worksheetInitialState: WorksheetInitialStateType = {
  settings: null,
  loading: false,
};

export const getSettingsByWorksheetId = createAsyncThunk(
  "worksheet/getSettingsByWorksheetId",
  async (worksheetId: number) => {
    return await worksheetService.GetSettingsByWorksheetId(worksheetId);
  }
);

const worksheetSlice = createSlice({
  name: "worksheet",
  initialState: worksheetInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSettingsByWorksheetId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSettingsByWorksheetId.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(getSettingsByWorksheetId.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectWorksheetSettings = (state: RootState) =>
  state.worksheet.settings;
export const selectWorksheetLoading = (state: RootState) =>
  state.worksheet.loading;

export const {} = worksheetSlice.actions;
export default worksheetSlice.reducer;
