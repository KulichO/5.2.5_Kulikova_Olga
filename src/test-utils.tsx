import React from "react";
import type { PropsWithChildren } from "react";
import { render as rtlRender } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import store from "./store/store";
import { theme } from "./ui/theme/theme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

function AllProviders({ children }: PropsWithChildren) {
  return (
    <MemoryRouter>
      <Provider store={store}>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </Provider>
    </MemoryRouter>
  );
}

export function render(
  ui: React.ReactElement,
  options?: Parameters<typeof rtlRender>[1]
) {
  return rtlRender(ui, { wrapper: AllProviders, ...(options || {}) });
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
