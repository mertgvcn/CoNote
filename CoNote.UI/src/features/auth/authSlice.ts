import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//utils
import { authService } from "./authService";

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: true,
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
  initialState,
  reducers: {
    endSession: (state) => {
      state.isAuthenticated = false;
      state.loading = false;
    },
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

export const { endSession } = authSlice.actions;
export default authSlice.reducer;
