import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
//utils
import { authService } from "./authService";

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
}

export const authInitialState: AuthState = {
  isAuthenticated: false,
  loading: false,
};

export const validateToken = createAsyncThunk(
  "auth/validateToken",
  async (_, thunkAPI) => {
    const result = await authService.isAuthenticated();
    return result;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    endSession: () => {},
  },
  extraReducers: (builder) => {
    builder.addCase(validateToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(validateToken.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload;
      state.loading = false;
    });
    builder.addCase(validateToken.rejected, (state) => {
      state.isAuthenticated = false;
      state.loading = false;
    });
  },
});

export const selectAuthIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.loading;

export const { endSession } = authSlice.actions;
export default authSlice.reducer;
