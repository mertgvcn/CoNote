import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
//utils
import { notificationService } from "../notificationService";
//models
import { NotificationView } from "../../../models/views/NotificationView";

export const notificationAdapter = createEntityAdapter({
  selectId: (notification: NotificationView) => notification.id,
});

export const notificationInitialState =
  notificationAdapter.getInitialState({
    loading: false,
  });

export const getCurrentUserNotifications = createAsyncThunk(
  "notification/getCurrentUserNotifications",
  async (_, thunkAPI) => {
    const result = await notificationService.GetCurrentUserNotifications();
    return result;
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState: notificationInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUserNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUserNotifications.fulfilled, (state, action) => {
        state.loading = false;
        notificationAdapter.setAll(state, action.payload);
      })
      .addCase(getCurrentUserNotifications.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const notificationSelectors = notificationAdapter.getSelectors(
  (state: RootState) => state.notification
);
export const selectNotificationLoading = (state: RootState) =>
  state.notification.loading;

export const {} = notificationSlice.actions;
export default notificationSlice.reducer;
