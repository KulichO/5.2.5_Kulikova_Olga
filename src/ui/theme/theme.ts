import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "brand",
  fontFamily: "Open Sans, sans-serif",
  radius: {
    xs: "2px",
    sm: "4px",
    md: "8px",
    lg: "16px",
    xl: "24px",
  },
  defaultRadius: "xl",

  colors: {
    brand: [
      "#228BE6",
      "#228BE6",
      "#228BE6",
      "#228BE6",
      "#228BE6",
      "#4263EB",
      "#4263EB",
      "#364FC7",
      "#364FC7",
      "#364FC7",
    ],
  },
});
