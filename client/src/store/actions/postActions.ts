import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "../../services/verbs";
import endPoints from "../../services/urls";
import { IPost } from "../../models/data";

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getRequest(endPoints.Post_URL);

      return data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  },
);

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (body: IPost, { rejectWithValue }) => {
    try {
      const data = await postRequest(endPoints.Post_URL, body);

      console.log(data);

      return data;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async (post: IPost, { rejectWithValue }) => {
    try {
      const data = await patchRequest(endPoints.Post_URL, post);

      return data;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId: string, { rejectWithValue }) => {
    try {
      await deleteRequest(endPoints.Post_URL, postId);

      return postId;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);
