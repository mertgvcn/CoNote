import { combineReducers, Reducer } from "@reduxjs/toolkit";
//slices
import authReducer, {
  authInitialState,
  endSession,
} from "../features/auth/authSlice";
import workspaceReducer, {
  workspaceInitialState,
} from "../features/workspace/workspaceSlice";

export const appReducer = combineReducers({
  auth: authReducer,
  workspace: workspaceReducer,
});

const initialStates = {
  auth: authInitialState,
  workspace: workspaceInitialState,
};

export const rootReducer: Reducer = (state, action) => {
  if (action.type === endSession.type) {
    return initialStates;
  }
  return appReducer(state, action);
};
