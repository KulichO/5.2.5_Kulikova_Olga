import type { RootState } from "./store";

export const selectSearch = (state: RootState) => state.vacancies.search;
export const selectCity = (state: RootState) => state.vacancies.city;
export const selectSkills = (state: RootState) => state.vacancies.skills;

export const selectItems = (state: RootState) => state.vacancies.items;
export const selectIsLoading = (state: RootState) => state.vacancies.isLoading;
export const selectError = (state: RootState) => state.vacancies.error;

export const selectPage = (state: RootState) => state.vacancies.page;
export const selectTotalPages = (state: RootState) =>
  state.vacancies.totalPages;
