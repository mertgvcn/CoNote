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
import { MarkNotificationAsReadRequest } from "../../../api/Notification/models/MarkNotificationAsReadRequest";

export const notificationAdapter = createEntityAdapter({
  selectId: (notification: NotificationView) => notification.id,
});

export const notificationInitialState = notificationAdapter.getInitialState({
  loading: false,
});

export const getCurrentUserNotifications = createAsyncThunk(
  "notification/getCurrentUserNotifications",
  async (_, thunkAPI) => {
    const result = await notificationService.GetCurrentUserNotifications();
    return result;
  }
);

export const markNotificationsAsRead = createAsyncThunk(
  "notification/markNotificationsAsRead",
  async (request: MarkNotificationAsReadRequest, thunkAPI) => {
    const result = await notificationService.MarkNotificationsAsRead(request);
    return result;
  }
);

export const deleteNotification = createAsyncThunk(
  "notification/deleteNotification",
  async (notificationId: number, thunkAPI) => {
    const result = await notificationService.DeleteNotification(notificationId);
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
      })

      //MarkNotificationsAsRead
      .addCase(markNotificationsAsRead.pending, (state) => {
        state.loading = true;
      })
      .addCase(markNotificationsAsRead.fulfilled, (state, action) => {
        state.loading = false;
        const updates = action.payload.map((id: number) => ({
          id,
          changes: { isRead: true },
        }));
        notificationAdapter.updateMany(state, updates);
      })
      .addCase(markNotificationsAsRead.rejected, (state) => {
        state.loading = false;
      })

      //DeleteNotification
      .addCase(deleteNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.loading = false;
        notificationAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteNotification.rejected, (state) => {
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
