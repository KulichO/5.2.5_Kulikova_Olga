import type { Vacancy, VacanciesState } from "./types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getVacancies } from "./getVacancies";
import type { RootState } from "./store";

export const fetchVacancies = createAsyncThunk<
  { items: Vacancy[]; pages: number },
  void,
  { state: RootState }
>("vacancies/fetch", async (_, { getState }) => {
  const state = getState().vacancies;

  return getVacancies({
    search: state.search,
    city: state.city,
    skills: state.skills,
    page: state.page,
    perPage: state.perPage,
  });
});

const initialState: VacanciesState = {
  skills: ["TypeScript", "React", "Redux"],
  page: 1,
  perPage: 10,
  items: [],
  isLoading: false,
  error: null,
  totalPages: 1,
  search: "",
  city: null,
};

const vacanciesSlice = createSlice({
  name: "vacancies",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setCity(state, action: PayloadAction<string | null>) {
      state.city = action.payload;
      state.page = 1;
    },
    addSkill(state, action: PayloadAction<string>) {
      const skill = action.payload.trim();
      if (skill && !state.skills.includes(skill)) {
        state.skills.push(skill);
        state.page = 1;
      }
    },
    removeSkill(state, action: PayloadAction<string>) {
      state.skills = state.skills.filter((s) => s !== action.payload);
      state.page = 1;
    },
    setSkills(state, action: PayloadAction<string[]>) {
      state.skills = action.payload;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchVacancies.fulfilled,
        (state, action: PayloadAction<{ items: Vacancy[]; pages: number }>) => {
          state.isLoading = false;
          state.items = action.payload.items;
          state.totalPages = action.payload.pages;
        }
      )
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Ошибка";
      });
  },
});

export default vacanciesSlice.reducer;
export const { setSearch, setPage, setCity, addSkill, removeSkill, setSkills } =
  vacanciesSlice.actions;
