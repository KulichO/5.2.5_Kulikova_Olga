import { configureStore } from "@reduxjs/toolkit";
import vacanciesReducer from "./vacanciesSlice";

const store = configureStore({
  reducer: {
    vacancies: vacanciesReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
