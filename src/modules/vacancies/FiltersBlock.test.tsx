import { render, screen, userEvent } from "../../test-utils";
import { it, expect, vi, beforeEach, describe } from "vitest";
import { FiltersBlock } from "./FiltersBlock";

const mockDispatch = vi.fn();

const mockState = {
  vacancies: {
    skills: [] as string[],
    city: null as string | null,
  },
};

vi.mock("../../store/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: any) => selector(mockState),
}));

beforeEach(() => {
  mockDispatch.mockClear();
  mockState.vacancies.skills = [];
  mockState.vacancies.city = null;
});

describe("Skills", () => {
  it("Инпут рендерится", async () => {
    render(<FiltersBlock />);

    const input = screen.getByPlaceholderText("Навык");
    expect(input).toBeInTheDocument();

    await userEvent.type(input, "текст");

    expect(input).toHaveValue("текст");
  });

  it('Клик по "Enter" добавляет pill в список', async () => {
    render(<FiltersBlock />);

    const input = screen.getByPlaceholderText("Навык");
    expect(input).toBeInTheDocument();

    await userEvent.type(input, "текст");
    await userEvent.keyboard("{Enter}");

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    const action = mockDispatch.mock.calls[0][0];

    expect(action.type).toContain("addSkill");
    expect(action.payload).toBe("текст");
  });

  it('Клик по "+" добавляет pill в список', async () => {
    render(<FiltersBlock />);

    const input = screen.getByPlaceholderText("Навык");
    const addBtn = screen.getByRole("button", { name: "add-skill" });

    expect(input).toBeInTheDocument();

    await userEvent.type(input, "текст");
    await userEvent.click(addBtn);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    const action = mockDispatch.mock.calls[0][0];

    expect(action.type).toContain("addSkill");
    expect(action.payload).toBe("текст");
  });

  it("Клик по крестику удаляет pill", async () => {
    mockState.vacancies.skills = ["React"];

    render(<FiltersBlock />);

    const pill = screen.getByText("React");
    expect(pill).toBeInTheDocument();

    const removeBtn = document.querySelector(
      '[aria-label="remove-skill-React"]'
    ) as HTMLElement;

    expect(removeBtn).not.toBeNull();

    await userEvent.click(removeBtn);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    const action = mockDispatch.mock.calls[0][0];
    expect(action.type).toContain("removeSkill");
    expect(action.payload).toBe("React");
  });
});

describe("Cities", () => {
  it("Select рендерится", () => {
    render(<FiltersBlock />);
    const select = screen.getByPlaceholderText("Все города");

    expect(select).toBeInTheDocument();
  });

  it("Дропдаун открывается и видно список городов", async () => {
    render(<FiltersBlock />);

    const select = screen.getByPlaceholderText("Все города");

    await userEvent.click(select);

    const all = await screen.findByText("Все города");
    const moscow = await screen.findByText("Москва");
    const spb = await screen.findByText("Санкт-Петербург");

    expect(all).toBeInTheDocument();
    expect(moscow).toBeInTheDocument();
    expect(spb).toBeInTheDocument();
  });

  it('Выбор "Москва" диспатчит setCity("1")', async () => {
    render(<FiltersBlock />);

    const select = screen.getByPlaceholderText("Все города");
    await userEvent.click(select);

    const moscow = await screen.findByText("Москва");
    await userEvent.click(moscow);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    const action = mockDispatch.mock.calls[0][0];

    expect(action.type).toContain("setCity");
    expect(action.payload).toBe("1");
  });

  it('Выбор "Санкт-Петербург" диспатчит setCity("2")', async () => {
    render(<FiltersBlock />);

    const select = screen.getByPlaceholderText("Все города");
    await userEvent.click(select);

    const spb = await screen.findByText("Санкт-Петербург");
    await userEvent.click(spb);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    const action = mockDispatch.mock.calls[0][0];

    expect(action.type).toContain("setCity");
    expect(action.payload).toBe("2");
  });

  it('Выбор "Все города" диспатчит setCity(null)', async () => {
    render(<FiltersBlock />);

    const select = screen.getByPlaceholderText("Все города");
    await userEvent.click(select);

    const all = await screen.findByText("Все города");
    await userEvent.click(all);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    const action = mockDispatch.mock.calls[0][0];

    expect(action.type).toContain("setCity");
    expect(action.payload).toBeNull();
  });
});
