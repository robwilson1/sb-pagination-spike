import create from "zustand";

import { getModelOptions, getReviewsParams, parseParams } from "../lib/api";

const initialPage = 1;
const initialRowsPerPage = 25;

const getReviewsUrl = (state) => {
  return `https://api.storyblok.com/v2/cdn/stories/${parseParams({
    ...getReviewsParams({
      make: state.selectedMake,
      model: state.selectedModel,
    }),
    page: state.page,
    per_page: state.rowsPerPage,
  })}`;
};

const useStore = create((set) => ({
  page: initialPage,
  rowsPerPage: initialRowsPerPage,
  selectedMake: "",
  selectedModel: "",
  modelOptions: [],
  reviewsUrl: `https://api.storyblok.com/v2/cdn/stories/${parseParams({
    ...getReviewsParams(),
    page: initialPage,
    per_page: initialRowsPerPage,
  })}`,

  setPage: (num) =>
    set((state) => ({
      page: num,
      reviewsUrl: getReviewsUrl({ ...state, page: num }),
    })),

  setRowsPerPage: (num) =>
    set((state) => ({
      rowsPerPage: num,
      page: 1,
      reviewsUrl: getReviewsUrl({ ...state, page: 1, rowsPerPage: num }),
    })),

  setSelectedMake: async (make) => {
    const modelOptions = await getModelOptions(make);
    set((state) => ({
      selectedMake: make,
      selectedModel: "",
      page: 1,
      modelOptions,
      reviewsUrl: getReviewsUrl({
        ...state,
        page: 1,
        selectedMake: make,
        selectedModel: "",
      }),
    }));
  },

  setSelectedModel: (model) =>
    set((state) => ({
      selectedModel: model,
      page: 1,
      reviewsUrl: getReviewsUrl({ ...state, page: 1, selectedModel: model }),
    })),
}));

export default useStore;
