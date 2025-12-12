export interface Vacancy {
  id: string;
  name: string;
  salary: {
    from: number | null;
    to: number | null;
    currency: string | null;
  } | null;
  experience: {
    id: string;
    name: string;
  } | null;
  employer: {
    name: string;
  } | null;
  area: {
    name: string;
  } | null;
  address: {
    city: string | null;
  } | null;
  schedule: {
    id: string;
    name: string;
  } | null;
  alternate_url: string;
  snippet?: {
    requirement?: string | null;
    responsibility?: string | null;
  } | null;
}

export interface VacanciesState {
  items: Vacancy[];
  isLoading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  search: string;
  skills: string[];
  city: string | null;
  perPage: number;
}
