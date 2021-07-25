import { PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";

export type ITheme = {
  white: string;
  black: string;
};

export type Theme = "dark" | "normal";

const defaultTheme: Theme = "dark";

export const defaultThemes: Record<Theme, ITheme> = {
  dark: {
    white: "black",
    black: "white",
  },
  normal: {
    white: "white",
    black: "black",
  },
};

type ToggleThemeFunction = (theme?: Theme) => void;

const ThemeContext = createContext<{
  theme: ITheme;
  toggleThem: ToggleThemeFunction;
}>(undefined!);

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  return theme.theme;
};

export const useToogleTheme = () => {
  const theme = useContext(ThemeContext);
  return theme.toggleThem;
};

export const ThemeProvider = (props: PropsWithChildren<{ theme?: Theme }>) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const updateTheme: ToggleThemeFunction = (passTheme) => {
    if (passTheme) {
      setTheme(passTheme);
    } else {
      setTheme(theme == "dark" ? "normal" : "dark");
    }
  };
  return (
    <ThemeContext.Provider
      value={{ theme: defaultThemes[theme], toggleThem: updateTheme }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
