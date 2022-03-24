import axios from "axios";

export const paginationFetcher = (url) => {
  const params = new URLSearchParams(url);

  return axios.get(url).then((res) => ({
    total: parseInt(res.headers.total, 10),
    stories: res.data.stories,
    page: parseInt(params.get("page"), 10),
    perPage: parseInt(params.get("per_page"), 10),
    url,
  }));
};

export const parseParams = (params = {}) => {
  let result = "";

  const allParams = {
    ...params,
    token: process.env.NEXT_PUBLIC_TOKEN,
    per_page: params.per_page || 10,
    page: Math.max(1, params.page || 1),
  };

  Object.keys(allParams).forEach((key, idx) => {
    const symbol = idx === 0 ? "?" : "&";
    result += `${symbol}${key}=${allParams[key]}`;
  });

  return result;
};

export function getReviewsParams({ preview = false } = {}) {
  const sbParams = {
    starts_with: "car-reviews/",
    version: "published",
    cv: Date.now(),
  };

  if (preview) {
    sbParams.version = "draft";
    sbParams.cv = Date.now();
  }

  return sbParams;
}
