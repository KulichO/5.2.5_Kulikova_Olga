import { render, screen } from "../../test-utils";
import { it, expect } from "vitest";
import { VacancyCard } from "./VacancyCard";
import type { Vacancy } from "../../store/types";

const vacancy: Vacancy = {
  id: "1",
  name: "Frontend разработчик в EdTech продукт",
  salary: {
    from: 80000,
    to: 170000,
    currency: "RUR",
  },
  experience: {
    id: "between1And3",
    name: "Опыт 1-3 года",
  },
  employer: {
    name: "Kata Academy",
  },
  area: {
    name: "Набережные Челны",
  },
  address: {
    city: "Набережные Челны",
  },
  schedule: {
    id: "remote",
    name: "Удалённая работа",
  },
  alternate_url: "https://hh.ru/vacancy/123",
};

it("Основные поля вакансии рендерятся", () => {
  render(<VacancyCard vacancy={vacancy} mode="list" />);

  expect(
    screen.getByText("Frontend разработчик в EdTech продукт")
  ).toBeInTheDocument();

  const salary = screen.getByText(/₽/);
  expect(salary).toBeInTheDocument();
  expect(salary.textContent).toMatch(/80/);
  expect(salary.textContent).toMatch(/170/);

  expect(screen.getByText("Опыт 1-3 года")).toBeInTheDocument();

  expect(screen.getByText("Kata Academy")).toBeInTheDocument();

  expect(screen.getByText("Набережные Челны")).toBeInTheDocument();

  const viewLink = screen.getByRole("link", {
    name: "Откликнуться",
  });
  expect(viewLink).toBeInTheDocument();
});

it('Кнопка "Откликнуться" ведёт по ссылке и открывает в новой вкладке', () => {
  render(<VacancyCard vacancy={vacancy} mode="list" />);

  const link = screen.getByRole("link", {
    name: "Откликнуться",
  });

  expect(link).toHaveAttribute("href", vacancy.alternate_url);
  expect(link).toHaveAttribute("target", "_blank");
});
