import { createSlice } from "@reduxjs/toolkit";
import { IAuthSliceState } from "../../models/data";
import { login, logout, register } from "../actions/authActions";

const initialState: IAuthSliceState = {
  isLoading: false,
  error: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message as string;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.token = payload;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message as string;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.token = payload;
    });
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message as string;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
      state.token = null;
    });
  },
});

export default authSlice.reducer;
