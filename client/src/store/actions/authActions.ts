import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { deleteRequest, postRequest } from "../../services/verbs";
import endPoints from "../../services/urls";
import { ILoginBody, IRegisterBody } from "../../models/data";

export const register = createAsyncThunk(
  "auth/register",
  async (userData: IRegisterBody, { rejectWithValue }) => {
    try {
      const data = await postRequest(endPoints.Register_URL, userData);

      localStorage.setItem("jwt", data.token);

      return data.token;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData: ILoginBody, { rejectWithValue }) => {
    try {
      const data = await postRequest(endPoints.Login_URL, userData);

      localStorage.setItem("jwt", data.token);

      return data.token;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue("Login error: " + err.response?.data);
    }
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await deleteRequest(endPoints.Logout_URL);

      localStorage.removeItem("jwt");
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue("Login error: " + err.response?.data);
    }
  },
);
