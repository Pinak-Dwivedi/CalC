import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ThemeContextType = {
  theme: "light" | "dark";
  isDark: boolean;
  loading: boolean;
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
};

type ThemeProviderPropsType = {
  children: ReactNode;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  isDark: true,
  loading: true,
  setTheme: () => {},
});

export default function ThemeProvider({ children }: ThemeProviderPropsType) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("theme")
      .then((themeValue) => {
        if (
          themeValue != null &&
          (themeValue === "dark" || themeValue === "light")
        )
          setTheme(themeValue);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    (async function () {
      AsyncStorage.setItem("theme", theme);
    })();
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, loading }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
