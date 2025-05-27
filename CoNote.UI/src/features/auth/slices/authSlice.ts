import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
//utils
import { authService } from "../authService";

interface AuthInitialStateType {
  isAuthenticated: boolean;
  loading: boolean;
  isAppInitialized: boolean;
}

export const authInitialState: AuthInitialStateType = {
  isAuthenticated: false,
  loading: false,
  isAppInitialized: false,
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
    setIsAppInitialized: (state, action) => {
      state.isAppInitialized = action.payload;
    },
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
export const selectAuthIsAppInitialized = (state: RootState) =>
  state.auth.isAppInitialized;

export const { setIsAppInitialized, endSession } = authSlice.actions;
export default authSlice.reducer;
