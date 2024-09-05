import { Slot } from "expo-router";
import ThemeProvider from "@/context/ThemeProvider";
import * as Font from "expo-font";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      ...FontAwesome5.font,
      ...FontAwesome6.font,
    }).then(() => {
      setFontsLoaded(true);
      SplashScreen.hideAsync();
    });
  }, []);

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider>
      <Slot />
    </ThemeProvider>
  );
}
