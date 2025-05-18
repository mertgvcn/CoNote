import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
//models
import { StructureView } from "../../../models/views/StructureView";
import { WorkspaceInvitationView } from "../../../models/views/WorkspaceInvitationView";
import { MemberView } from "../../../models/views/MemberView";
import { WorkspaceSettingsView } from "../../../models/views/WorkspaceSettingsView";
import { RoleView } from "../../../models/views/RoleView";
//utils
import { workspaceService } from "../workspaceService";

export const structureAdapter = createEntityAdapter({
  selectId: (structure: StructureView) => structure.id,
});

export const memberAdapter = createEntityAdapter({
  selectId: (member: MemberView) => member.id,
});

export const invitationAdapter = createEntityAdapter({
  selectId: (invitation: WorkspaceInvitationView) => invitation.id,
});

export const rolesAdapter = createEntityAdapter({
  selectId: (role: RoleView) => role.id,
});

interface WorkspaceDetailsInitialStateType {
  structure: EntityState<StructureView, number>;
  members: EntityState<MemberView, number>;
  invitations: EntityState<WorkspaceInvitationView, number>;
  settings: WorkspaceSettingsView | null;
  roles: EntityState<RoleView, number>;
  loading: boolean;
  clickedSections: number[];
}

export const workspaceDetailsInitialState: WorkspaceDetailsInitialStateType = {
  structure: structureAdapter.getInitialState(),
  members: memberAdapter.getInitialState(),
  invitations: invitationAdapter.getInitialState(),
  settings: null,
  roles: rolesAdapter.getInitialState(),
  loading: false,
  clickedSections: [],
};

export const getStructureByWorkspaceAndSectionId = createAsyncThunk(
  "workspaceDetails/getStructureByWorkspaceAndSectionId",
  async ({
    workspaceId,
    sectionId,
  }: {
    workspaceId: number;
    sectionId?: number;
  }) => {
    return await workspaceService.GetStructureByWorkspaceAndSectionId(
      workspaceId,
      sectionId
    );
  }
);

export const getMembersByWorkspaceId = createAsyncThunk(
  "workspaceDetails/getMembersByWorkspaceId",
  async (workspaceId: number) => {
    return await workspaceService.GetMembersByWorkspaceId(workspaceId);
  }
);

export const getInvitationsByWorkspaceId = createAsyncThunk(
  "workspaceDetails/getInvitationsByWorkspaceId",
  async (workspaceId: number) => {
    return await workspaceService.GetInvitationsByWorkspaceId(workspaceId);
  }
);

export const getSettingsByWorkspaceId = createAsyncThunk(
  "workspaceDetails/getSettingsByWorkspaceId",
  async (workspaceId: number) => {
    return await workspaceService.GetSettingsByWorkspaceId(workspaceId);
  }
);

export const getRolesByWorkspaceId = createAsyncThunk(
  "workspaceDetails/getRolesByWorkspaceId",
  async (workspaceId: number) => {
    return await workspaceService.GetRolesByWorkspaceId(workspaceId);
  }
);

const workspaceDetailsSlice = createSlice({
  name: "workspaceDetails",
  initialState: workspaceDetailsInitialState,
  reducers: {
    updateClickedSections: (state, action) => {
      state.clickedSections.push(action.payload);
    },
    removeClickedSection: (state, action) => {
      state.clickedSections = state.clickedSections.filter(
        (sectionId) => sectionId !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Structure
      .addCase(getStructureByWorkspaceAndSectionId.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getStructureByWorkspaceAndSectionId.fulfilled,
        (state, action) => {
          state.loading = false;
          structureAdapter.setAll(state.structure, action.payload);
        }
      )
      .addCase(getStructureByWorkspaceAndSectionId.rejected, (state) => {
        state.loading = false;
      })

      // Members
      .addCase(getMembersByWorkspaceId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMembersByWorkspaceId.fulfilled, (state, action) => {
        state.loading = false;
        memberAdapter.setAll(state.members, action.payload);
      })
      .addCase(getMembersByWorkspaceId.rejected, (state) => {
        state.loading = false;
      })

      // Invitations
      .addCase(getInvitationsByWorkspaceId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInvitationsByWorkspaceId.fulfilled, (state, action) => {
        state.loading = false;
        invitationAdapter.setAll(state.invitations, action.payload);
      })
      .addCase(getInvitationsByWorkspaceId.rejected, (state) => {
        state.loading = false;
      })

      // Settings
      .addCase(getSettingsByWorkspaceId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSettingsByWorkspaceId.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(getSettingsByWorkspaceId.rejected, (state) => {
        state.loading = false;
      })

      // Roles
      .addCase(getRolesByWorkspaceId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRolesByWorkspaceId.fulfilled, (state, action) => {
        state.loading = false;
        rolesAdapter.setAll(state.roles, action.payload);
      })
      .addCase(getRolesByWorkspaceId.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const structureSelectors = structureAdapter.getSelectors(
  (state: RootState) => state.workspaceDetails.structure
);
export const memberSelectors = memberAdapter.getSelectors(
  (state: RootState) => state.workspaceDetails.members
);
export const invitationSelectors = invitationAdapter.getSelectors(
  (state: RootState) => state.workspaceDetails.invitations
);
export const rolesSelectors = rolesAdapter.getSelectors(
  (state: RootState) => state.workspaceDetails.roles
);
export const selectWorkspaceDetailsSettings = (state: RootState) =>
  state.workspaceDetails.settings;
export const selectWorkspaceDetailsLoading = (state: RootState) =>
  state.workspaceDetails.loading;
export const selectWorkspaceDetailsClickedSections = (state: RootState) =>
  state.workspaceDetails.clickedSections;

export const { updateClickedSections, removeClickedSection } =
  workspaceDetailsSlice.actions;

export default workspaceDetailsSlice.reducer;
