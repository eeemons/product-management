import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const API_BASE_URL = "https://api.bitechx.com";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: any) => {
    const response = await fetch(`${API_BASE_URL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    return data;
  }
);

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
    rehydrateAuth: (state) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          state.token = token;
          state.isAuthenticated = true;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.token = action.payload.token;
        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { logout, rehydrateAuth } = authSlice.actions;
export default authSlice.reducer;
