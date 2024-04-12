import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  normalizeGuardianData,
  normalizeNYTData,
  normalizeNewsData,
} from '../../helpers/articles';

export const fetchPosts = createAsyncThunk(
  'fetchPosts',
  async ({
    query,
    category,
    pageSize,
    page,
    fromDate,
    toDate,
    selectedSources,
  }) => {
    try {
      let url = `${import.meta.env.VITE_NEWS_API_URL}?`;

      if (selectedSources) {
        const selectedSourcesString = selectedSources.join(',');
        url += `sources=${selectedSourcesString}&`;
      } else if (!category) {
        url += `sources=bbc-news,cnn,espn&`;
      }

      let sources = [];
      if (category && category.length > 0) {
        category.forEach((cat) => {
          switch (cat.toLowerCase()) {
            case 'business':
              sources.push(
                'bloomberg',
                'business-insider',
                'financial-post',
                'the-wall-street-journal'
              );
              break;
            case 'entertainment':
              sources.push(
                'buzzfeed',
                'entertainment-weekly',
                'mashable',
                'the-lad-bible'
              );
              break;
            case 'general':
              sources.push('abc-news', 'bbc-news', 'cbs-news', 'google-news');
              break;
            case 'health':
              sources.push(
                'medical-news-today',
                'national-geographic',
                'new-scientist',
                'the-verge'
              );
              break;
            case 'science':
              sources.push(
                'national-geographic',
                'new-scientist',
                'scientific-american',
                'the-verge'
              );
              break;
            case 'sports':
              sources.push('bbc-sport', 'espn', 'nfl-news', 'the-sport-bible');
              break;
            case 'technology':
              sources.push(
                'ars-technica',
                'engadget',
                'hacker-news',
                'techcrunch'
              );
              break;
            default:
              break;
          }
        });
      }

      if (sources.length > 0) {
        url += `sources=${sources.join(',')}&`;
      }

      const queryParams = new URLSearchParams({
        q: query ? encodeURIComponent(query) : '',
        from: fromDate || '',
        to: toDate || '',
        pageSize: pageSize.toString(),
        page: page.toString(),
        apiKey: `${import.meta.env.VITE_NEWS_API_KEY}`,
      });

      url += queryParams.toString();

      const response = await fetch(url);
      const data = await response.json();
      const normalizedData = normalizeNewsData(data);
      return normalizedData;
    } catch (err) {
      console.log('Error: ', err);
    }
  }
);

export const fetchNYTData = createAsyncThunk(
  'fetchNYTArticles',
  async ({ page, query, category, fromDate, toDate, selectedSources }) => {
    try {
      let url = `${import.meta.env.VITE_NYT_API_URL}?`;

      if (query) {
        url += `q=${encodeURIComponent(query)}&`;
      }

      if (category && category.length > 0) {
        const categoryQuery = category
          .map((cat) => `"${encodeURIComponent(cat)}"`)
          .join(',');
        url += `fq=news_desk:(${categoryQuery})&`;
      }
      if (selectedSources) {
        const sourcesQuery = `source.contains:(${selectedSources
          .map((source) => `"${encodeURIComponent(source)}"`)
          .join(' OR ')})`;
        url += `${sourcesQuery}&`;
      }

      if (fromDate && toDate) {
        url += `begin_date=${fromDate}&end_date=${toDate}&`;
      }

      url += `page=${page}&api-key=${import.meta.env.VITE_NYT_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      const normalizedData = normalizeNYTData(
        data.response.docs,
        data.response.meta.hits
      );
      return normalizedData;
    } catch (err) {
      console.log('Error: ', err);
    }
  }
);

export const fetchGuardianData = createAsyncThunk(
  'fetchGuardianData',
  async ({ page, query, category, fromDate, toDate, selectedSources }) => {
    try {
      let url = `${import.meta.env.VITE_GUARDIAN_API_URL}?`;

      if (query) {
        url += `q=${encodeURIComponent(query)}&`;
      }

      if (category && category.length > 0) {
        category.forEach((cat) => {
          url += `section=${encodeURIComponent(cat)}&`;
        });
      }

      if (selectedSources) {
        const tags = selectedSources
          .map((source) => `source:${encodeURIComponent(source)}`)
          .join(' OR ');
        url += `${tags}&`;
      }

      if (fromDate && toDate) {
        url += `from-date=${fromDate}&to-date=${toDate}&`;
      }

      url += `page=${page}&show-fields=thumbnail&show-tags=contributor&api-key=${
        import.meta.env.VITE_GUARDIAN_API_KEY
      }`;

      const response = await fetch(url);
      const data = await response.json();

      const normalizedData = normalizeGuardianData(data);
      return normalizedData;
    } catch (err) {
      console.log('Error: ', err);
    }
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
