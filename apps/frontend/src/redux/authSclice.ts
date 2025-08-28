import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserInformation,
  login,
  logout,
  signup,
  updateUserInformation,
} from "apps/frontend/src/serviceProvider/auth_services";

// Utility: check if cookie exists

export type UserDetail = {
  _id: string;
  name: string;
  email: string;
  password: string;
  extension: string;
  firstName: string;
  lastName: string;
  mobile: number;
  address: {
    addressLine1: string;
    addressLine2: string;
    state: string;
    city: string;
    pincode: number;
  };
};

type UserState = {
  user: UserDetail | null;
  loading: boolean;
  error: string | null;
  login: boolean;
};

const initialState: UserState = {
  user: null,
  login: false, // quick check on load
  loading: false,
  error: null,
};

// ✅ Async thunks
export const loginUser = createAsyncThunk(
  "user/login",
  async (formData: any) => {
    const res = await login(formData);
    return res;
  }
);

export const signupUser = createAsyncThunk(
  "user/signup",
  async (formData: any) => {
    const res = await signup(formData);
    return res;
  }
);

export const logOutUser = createAsyncThunk(
  "user/logout",
  async (userId: string | undefined) => {
    const res = await logout(userId);
    return res;
  }
);

// ✅ Fetch user details from backend on refresh
export const fetchUserInformation = createAsyncThunk(
  "user/fetchUserInformation",
  async () => {
    const res = await getUserInformation();
    return res;
  }
);

export const patchUserInformation = createAsyncThunk(
  "user/patchUserInformation",
  async (formData: any) => {
    const res = await updateUserInformation(formData);
    return res;
  }
);

// ✅ Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.login = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
        state.login = false;
      })

      // Signup
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.login = true;
      })

      // User details (rehydrate on refresh)
      // .addCase(userDetails.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(userDetails.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.user = action.payload;
      //   state.login = true;
      // })
      // .addCase(userDetails.rejected, (state) => {
      //   state.loading = false;
      //   state.user = null;
      //   state.login = false;
      // })

      // Logout
      .addCase(logOutUser.fulfilled, (state) => {
        state.user = null;
        state.login = false;
      });
  },
});

export default userSlice.reducer;
