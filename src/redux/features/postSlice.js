import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  normalizeGuardianData,
  normalizeNYTData,
  normalizeNewsData,
} from '../../helpers/articles';

export const fetchPosts = createAsyncThunk(
  'fetchPosts',
  async ({ query, pageSize, page, fromDate, toDate }) => {
    let url = 'https://newsapi.org/v2/everything?';

    if (query) {
      url += `q=${encodeURIComponent(query)}&`;
    } else {
      url += `sources=bbc-news,cnn,espn`;
    }

    const queryParams = new URLSearchParams({
      from: fromDate,
      to: toDate,
      pageSize: pageSize.toString(),
      page: page.toString(),
      apiKey: 'ab724326742f408cb0ac5211d1b30ce5',
    });

    // Append the rest of the query parameters to the URL
    url += queryParams.toString();

    const response = await fetch(url);
    const data = await response.json();
    const normalizedData = normalizeNewsData(data);
    return normalizedData;
  }
);

export const fetchTrendingPosts = createAsyncThunk(
  'fetchHeadlines',
  async () => {
    const queryParams = new URLSearchParams({
      country: 'us',
      apiKey: 'ab724326742f408cb0ac5211d1b30ce5',
    });

    const url = `https://newsapi.org/v2/top-headlines?${queryParams}`;

    const response = await fetch(url);
    const data = await response.json();

    return data;
  }
);
export const fetchNYTData = createAsyncThunk(
  'fetchNYTArticles',
  async ({ page, query }) => {
    let url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?';

    if (query) {
      url += `q=${encodeURIComponent(query)}&`;
    }

    url += `page=${page}&api-key=nLFuiowX7JG4RuPmBabZdVdyqGkD3y3G`;

    const response = await fetch(url);
    const data = await response.json();

    const normalizedData = normalizeNYTData(
      data.response.docs,
      data.response.meta.hits
    );
    return normalizedData;
  }
);

export const fetchGuardianData = createAsyncThunk(
  'fetchGuardianData',
  async ({ page, query }) => {
    let url = 'http://content.guardianapis.com/search?';

    if (query) {
      url += `q=${encodeURIComponent(query)}&`;
    }

    url += `page=${page}&show-fields=thumbnail&show-tags=contributor&api-key=e29b255d-f750-46ec-8cb0-24685a23e1aa`;

    const response = await fetch(url);
    const data = await response.json();

    const normalizedData = normalizeGuardianData(data);
    return normalizedData;
  }
);

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
