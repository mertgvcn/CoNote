import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
//utils
import { invitationService } from "../invitationService";
//models
import { InvitationView } from "../../../models/views/InvitationView";
import { UpdateInvitationStatusRequest } from "../../../api/Invitation/models/UpdateInvitationStatusRequest";

export const invitationAdapter = createEntityAdapter({
  selectId: (invitation: InvitationView) => invitation.id,
});

export const invitationInitialState = invitationAdapter.getInitialState({
  loading: false,
});

export const getCurrentUserInvitations = createAsyncThunk(
  "invitation/getCurrentUserInvitations",
  async (_, thunkAPI) => {
    const result = await invitationService.GetCurrentUserInvitations();
    return result;
  }
);

export const updateInvitationStatus = createAsyncThunk(
  "invitation/updateInvitationStatus",
  async (request: UpdateInvitationStatusRequest, thunkAPI) => {
    await invitationService.UpdateInvitationStatus(request);
    return request;
  }
);

const invitationSlice = createSlice({
  name: "invitation",
  initialState: invitationInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //GetCurrentUserInvitations
      .addCase(getCurrentUserInvitations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUserInvitations.fulfilled, (state, action) => {
        state.loading = false;
        invitationAdapter.setAll(state, action.payload);
      })
      .addCase(getCurrentUserInvitations.rejected, (state) => {
        state.loading = false;
      })

      //UpdateInvitationStatus
      .addCase(updateInvitationStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateInvitationStatus.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action);
        invitationAdapter.updateOne(state, {
          id: action.payload.invitationId,
          changes: { status: action.payload.status },
        });
      })
      .addCase(updateInvitationStatus.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const invitationSelectors = invitationAdapter.getSelectors(
  (state: RootState) => state.invitation
);
export const selectInvitationLoading = (state: RootState) =>
  state.invitation.loading;

export const {} = invitationSlice.actions;
export default invitationSlice.reducer;
