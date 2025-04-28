import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost, IPostSliceState } from "../../models/data";
import {
  addPost,
  deletePost,
  editPost,
  getAllPosts,
} from "../actions/postActions";

const initialState: IPostSliceState = {
  isLoading: false,
  error: null,
  posts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPosts.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message as string;
      })
      .addCase(
        getAllPosts.fulfilled,
        (state, action: PayloadAction<IPost[]>) => {
          state.isLoading = false;
          state.error = null;
          state.posts = action.payload;
        },
      )
      .addCase(addPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPost.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message as string;
      })
      .addCase(addPost.fulfilled, (state, action: PayloadAction<IPost>) => {
        state.isLoading = false;
        state.error = null;
        state.posts.push(action.payload);
      })
      .addCase(editPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editPost.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message as string;
      })
      .addCase(editPost.fulfilled, (state, action: PayloadAction<IPost>) => {
        state.isLoading = false;
        state.error = null;
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id,
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message as string;
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = null;
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      });
  },
});

export default postSlice.reducer;
