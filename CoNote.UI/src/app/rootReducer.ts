import { combineReducers, Reducer } from "@reduxjs/toolkit";
//slices
import authReducer, {
  authInitialState,
  endSession,
} from "../features/auth/slices/authSlice";
import workspaceReducer, {
  workspaceInitialState,
} from "../features/workspace/slices/workspaceSlice";
import workspaceDetailsReducer, {
  workspaceDetailsInitialState,
} from "../features/workspace/slices/workspaceDetailsSlice";
import worksheetReducer, {
  worksheetInitialState,
} from "../features/worksheet/slices/worksheetSlice";
import notificationReducer, {
  notificationInitialState,
} from "../features/notification/slices/notificationSlice";
import invitationReducer, {
  invitationInitialState,
} from "../features/invitation/slices/invitationSlice";

export const appReducer = combineReducers({
  auth: authReducer,
  workspace: workspaceReducer,
  workspaceDetails: workspaceDetailsReducer,
  worksheet: worksheetReducer,
  notification: notificationReducer,
  invitation: invitationReducer,
});

const initialStates = {
  auth: authInitialState,
  workspace: workspaceInitialState,
  workspaceDetails: workspaceDetailsInitialState,
  worksheet: worksheetInitialState,
  notification: notificationInitialState,
  invitation: invitationInitialState,
};

export const rootReducer: Reducer = (state, action) => {
  if (action.type === endSession.type) {
    return initialStates;
  }
  return appReducer(state, action);
};
