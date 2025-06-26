// store/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";

import { AuthApi } from "../Api/Auth.api";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AuthApi.login(credentials);
      console.log("response", response);
      return {
        user: response.data?.data?.user,
        token: response?.data?.data?.accessToken,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);
