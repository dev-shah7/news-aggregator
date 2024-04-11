export function normalizeNYTData(apiResponseArray, totalResults) {
  return {
    totalResults: totalResults,
    articles: apiResponseArray
      .map((apiResponse) => {
        if (
          apiResponse &&
          apiResponse.headline &&
          apiResponse.headline.main &&
          apiResponse.multimedia &&
          apiResponse.multimedia.length > 0 &&
          apiResponse.multimedia[0].url &&
          apiResponse.byline &&
          apiResponse.byline.original &&
          apiResponse.pub_date &&
          apiResponse.web_url
        ) {
          return {
            title: apiResponse.headline.main,
            urlToImage: `https://www.nytimes.com/${apiResponse.multimedia[0].url}`,
            author: apiResponse.byline.original,
            publishedAt: apiResponse.pub_date,
            url: apiResponse.web_url,
          };
        } else {
          return null;
        }
      })
      .filter((article) => article !== null),
  };
}

export function normalizeGuardianData(apiResponse) {
  return {
    totalResults: apiResponse.response.total,
    articles: apiResponse.response.results.map((article) => ({
      title: article.webTitle,
      urlToImage: article.fields.thumbnail || null,
      author: article.tags.length > 0 ? article.tags[0].webTitle : null,
      publishedAt: article.webPublicationDate,
      url: article.webUrl,
    })),
  };
}

export function normalizeNewsData(apiResponse) {
  return {
    totalResults: apiResponse.totalResults,
    articles: apiResponse.articles.filter(
      (article) => article.urlToImage !== null
    ),
  };
}
