import { createTheme } from "@shopify/restyle";

const palette = {
  black: "#0B0B0B",
  white: "#F0F2F3",
  blue: "#2f95dc",
  gray: "#808080",
  red: "#D9534F",
};

const theme = createTheme({
  colors: {
    text: palette.black,
    background: palette.white,
    primary: palette.blue,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadii: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 64,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    defaults: {
      fontFamily: "GeistSans",
      fontSize: 16,
      color: "text",
    },
    title: {
      fontFamily: "GeistMono",
      fontSize: 24,
    },
  },
});

const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: palette.black,
    text: palette.white,
  },
};

export type Theme = typeof theme;

export { theme, darkTheme };
