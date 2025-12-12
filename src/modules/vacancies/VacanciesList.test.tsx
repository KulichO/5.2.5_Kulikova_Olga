import { render, screen } from "../../test-utils";
import { it, expect, beforeEach, vi } from "vitest";
import { VacanciesList } from "./VacanciesList";
import type { Vacancy } from "../../store/types";

const mockState = {
  vacancies: {
    items: [] as Vacancy[],
    isLoading: false,
    error: null as string | null,
  },
};

vi.mock("../../store/hooks", () => ({
  useAppSelector: (selector: any) => selector(mockState),
}));

vi.mock("./VacancyCard", () => ({
  VacancyCard: ({ vacancy }: { vacancy: Vacancy }) => (
    <div data-testid="vacancy-card">{vacancy.name}</div>
  ),
}));

const makeVacancy = (id: string, name: string): Vacancy => ({
  id,
  name,
  salary: null,
  experience: null,
  employer: null,
  area: null,
  address: null,
  schedule: null,
  alternate_url: "#",
});

beforeEach(() => {
  mockState.vacancies.items = [];
  mockState.vacancies.isLoading = false;
  mockState.vacancies.error = null;
});

it("Карточки рендерятся когда есть items", () => {
  mockState.vacancies.items = [
    makeVacancy("1", "Vacancy 1"),
    makeVacancy("2", "Vacancy 2"),
  ];

  render(<VacanciesList />);

  const cards = screen.getAllByTestId("vacancy-card");
  expect(cards).toHaveLength(2);
  expect(cards[0]).toHaveTextContent("Vacancy 1");
  expect(cards[1]).toHaveTextContent("Vacancy 2");
});

it('когда нет items "Ничего не найдено"', () => {
  mockState.vacancies.items = [];
  mockState.vacancies.isLoading = false;
  mockState.vacancies.error = null;

  render(<VacanciesList />);

  expect(screen.getByText("Ничего не найдено")).toBeInTheDocument();
});

it('при error показывается "Ошибка загрузки: ..."', () => {
  mockState.vacancies.error = "Сервер недоступен";

  render(<VacanciesList />);

  expect(
    screen.getByText("Ошибка загрузки: Сервер недоступен")
  ).toBeInTheDocument();

  expect(screen.queryByTestId("vacancy-card")).not.toBeInTheDocument();
});
