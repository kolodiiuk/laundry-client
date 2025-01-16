import { createSlice } from "@reduxjs/toolkit/react";
import { User } from "../../models/User";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
  loading: false
}

export const authSlice : any = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

  }
});

export const serviceActions = authSlice.actions;
export default authSlice.reducer;