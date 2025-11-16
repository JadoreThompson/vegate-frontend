import { useEffect, type FC } from "react";
import { useThemeStore } from "../../stores/theme-store";

const ThemeProvider: FC<{ children: React.ReactNode }> = (props) => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  return props.children;
};

export default ThemeProvider;
