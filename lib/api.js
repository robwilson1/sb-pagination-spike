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
    per_page: params.per_page || 25,
    page: Math.max(1, params.page || 1),
  };

  Object.keys(allParams).forEach((key, idx) => {
    const symbol = idx === 0 ? "?" : "&";
    result += `${symbol}${key}=${allParams[key]}`;
  });

  return result;
};

export const getMakeOptions = async () => {
  const res = await axios.get(
    `https://api.storyblok.com/v2/cdn/tags?token=${process.env.NEXT_PUBLIC_TOKEN}`
  );

  return res.data.tags
    .filter((tag) => tag.name.includes("make:"))
    .map((tag) => tag.name.slice(5));
};

export const getModelOptions = async (make) => {
  const res = await axios.get(
    `https://api.storyblok.com/v2/cdn/stories?with_tag=make:${make}&token=${process.env.NEXT_PUBLIC_TOKEN}`
  );

  const tags = res.data.stories
    .flatMap((story) => story.tag_list)
    .filter((tag) => tag.includes("model:"))
    .map((tag) => tag.slice(6));

  if (!tags) return [];

  return [...new Set(tags)];
};

export function getReviewsParams({
  preview = false,
  make = "",
  model = "",
} = {}) {
  const sbParams = {
    starts_with: "car-reviews",
    version: "published",
    cv: Date.now(),
  };

  if (preview) {
    sbParams.version = "draft";
    sbParams.cv = Date.now();
  }

  if (make) {
    sbParams.with_tag = `make:${make}`;
  }

  if (model) {
    sbParams.with_tag = `model:${model}`;
  }

  return sbParams;
}
