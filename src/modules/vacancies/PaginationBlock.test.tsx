import { render, screen, userEvent } from "../../test-utils";
import { it, expect, beforeEach, vi } from "vitest";
import { PaginationBlock } from "./PaginationBlock";

const mockDispatch = vi.fn();

const mockState = {
  vacancies: {
    page: 1,
    totalPages: 10,
  },
};

vi.mock("../../store/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: any) => selector(mockState),
}));

beforeEach(() => {
  mockDispatch.mockClear();
  mockState.vacancies.page = 1;
  mockState.vacancies.totalPages = 10;
});

it("пагинация рендерится", () => {
  render(<PaginationBlock />);

  const nextBtn = screen.getByRole("button", { name: "next-page" });
  expect(nextBtn).toBeInTheDocument();
});

it("клик по Next диспатчит setPage(page + 1)", async () => {
  mockState.vacancies.page = 2;

  render(<PaginationBlock />);

  const nextBtn = screen.getByRole("button", { name: "next-page" });
  await userEvent.click(nextBtn);

  expect(mockDispatch).toHaveBeenCalledTimes(1);
  const action = mockDispatch.mock.calls[0][0];

  expect(action.type).toContain("setPage");
  expect(action.payload).toBe(3);
});

it("клик по First диспатчит (setPage(1)", async () => {
  mockState.vacancies.page = 5;

  render(<PaginationBlock />);

  const firstBtn = screen.getByRole("button", { name: "first-page" });
  await userEvent.click(firstBtn);

  expect(mockDispatch).toHaveBeenCalledTimes(1);
  const action = mockDispatch.mock.calls[0][0];

  expect(action.type).toContain("setPage");
  expect(action.payload).toBe(1);
});

it("клик по Last диспатчит setPage(totalPages)", async () => {
  mockState.vacancies.page = 3;
  mockState.vacancies.totalPages = 7;

  render(<PaginationBlock />);

  const lastBtn = screen.getByRole("button", { name: "last-page" });
  await userEvent.click(lastBtn);

  expect(mockDispatch).toHaveBeenCalledTimes(1);
  const action = mockDispatch.mock.calls[0][0];

  expect(action.type).toContain("setPage");
  expect(action.payload).toBe(7);
});
