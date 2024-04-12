import { createSlice } from '@reduxjs/toolkit';
import {
  fetchGuardianData,
  fetchNYTData,
  fetchPosts,
  fetchTrendingPosts,
} from '../actions/postAction';

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    isLoading: false,
    blogs: null,
    trendingPosts: null,
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.blogs = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.error = true;
    });
    builder.addCase(fetchTrendingPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTrendingPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.trendingPosts = action.payload;
    });
    builder.addCase(fetchTrendingPosts.rejected, (state) => {
      state.error = true;
    });
    builder.addCase(fetchNYTData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchNYTData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.blogs = action.payload;
    });
    builder.addCase(fetchNYTData.rejected, (state) => {
      state.error = true;
    });
    builder.addCase(fetchGuardianData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchGuardianData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.blogs = action.payload;
    });
    builder.addCase(fetchGuardianData.rejected, (state) => {
      state.error = true;
    });
  },
});

export default postSlice.reducer;
