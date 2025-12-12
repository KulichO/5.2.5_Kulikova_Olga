import { HomePage } from "./pages/HomePage";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { VacancyPage } from "./pages/VacancyPage";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect } from "react";
import { fetchVacancies } from "./store/vacanciesSlice";
import {
  selectSearch,
  selectCity,
  selectSkills,
  selectPage,
  selectPerPage,
} from "./store/vacanciesSelectors";

function App() {
  const dispatch = useAppDispatch();

  const search = useAppSelector(selectSearch);
  const city = useAppSelector(selectCity);
  const skills = useAppSelector(selectSkills);
  const page = useAppSelector(selectPage);
  const perPage = useAppSelector(selectPerPage);

  useEffect(() => {
    dispatch(fetchVacancies());
  }, [dispatch, search, city, skills, page, perPage]);

  return (
    <BrowserRouter basename="/5.2.5_Kulikova_Olga">
      <Routes>
        <Route path="/" element={<Navigate to="/vacancies" replace />} />
        <Route path="/vacancies" element={<HomePage />} />
        <Route path="/vacancies/:id" element={<VacancyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
