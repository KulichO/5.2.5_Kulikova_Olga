import { render, screen, userEvent } from "../../test-utils";
import { it, expect, vi, beforeEach } from "vitest";
import { SearchBar } from "./SearchBar";

const mockDispatch = vi.fn();

vi.mock("../../store/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: vi.fn((fn) => fn({ vacancies: { search: "" } })),
}));

beforeEach(() => {
  mockDispatch.mockClear();
});

it("Поле поиска рендерится и работает", async () => {
  render(<SearchBar />);

  const input = screen.getByPlaceholderText("Должность или название компании");
  expect(input).toBeInTheDocument();

  await userEvent.type(input, "текст");

  expect(input).toHaveValue("текст");
});

it('Кнопка "Найти" диспатчит setSearch с введённым текстом', async () => {
  render(<SearchBar />);

  const find = screen.getByRole("button", { name: "Найти" });
  const input = screen.getByPlaceholderText("Должность или название компании");
  expect(find).toBeInTheDocument();

  await userEvent.type(input, "текст");
  await userEvent.click(find);

  expect(mockDispatch).toHaveBeenCalledTimes(1);
  const action = mockDispatch.mock.calls[0][0];

  expect(action.type).toContain("setSearch");
  expect(action.payload).toBe("текст");
});

it("Нажатие Enter диспатчит setSearch с введённым текстом", async () => {
  render(<SearchBar />);

  const input = screen.getByPlaceholderText("Должность или название компании");

  await userEvent.type(input, "текст");
  await userEvent.keyboard("{Enter}");

  expect(mockDispatch).toHaveBeenCalledTimes(1);
  const action = mockDispatch.mock.calls[0][0];

  expect(action.type).toContain("setSearch");
  expect(action.payload).toBe("текст");
});
