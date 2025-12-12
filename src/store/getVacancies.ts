import ky from "ky";
import type { Vacancy } from "./types";

const hhApi = ky.create({
  prefixUrl: "https://api.hh.ru",
  headers: {
    "User-Agent": "my-frontend-app",
  },
});

export async function getVacancies({
  search,
  city,
  skills,
  page,
  perPage,
}: {
  search: string;
  city: string | null;
  skills: string[];
  page: number;
  perPage: number;
}) {
  return hhApi
    .get("vacancies", {
      searchParams: {
        industry: 7,
        professional_role: 96,
        text: search || undefined,
        area: city || undefined,
        skill_set: JSON.stringify(skills),
        page: page - 1,
        per_page: perPage,
      },
    })
    .json<{
      items: Vacancy[];
      found: number;
      pages: number;
    }>();
}
