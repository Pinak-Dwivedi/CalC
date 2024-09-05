import { Pressable } from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { useTheme } from "@/context/ThemeProvider";
import { useEffect } from "react";

type ToggleThemeProps = {
  styles?: String;
};

export default function ToggleTheme({ styles }: ToggleThemeProps) {
  const { isDark, setTheme } = useTheme();
  const transform = useSharedValue(isDark ? 0 : 21);

  useEffect(() => {
    if (isDark) {
      transform.value = withTiming(0);
    } else {
      transform.value = withTiming(21);
    }
  }, [isDark]);

  function handleThemeToggle() {
    if (isDark) {
      setTheme("light");
      transform.value = withTiming(transform.value + 21);
    } else {
      setTheme("dark");
      transform.value = withTiming(transform.value - 21);
    }
  }

  return (
    <Pressable
      className={`rounded-xl ${styles} overflow-hidden ${
        isDark ? "border-compliment" : "border-dominant"
      }`}
      style={{
        borderWidth: 2,
        width: 45,
        height: 25,
      }}
      onPress={handleThemeToggle}
    >
      <Animated.View
        className="bg-accent rounded-full"
        style={{
          width: 21,
          height: 22,
          transform: [{ translateX: transform }],
        }}
      ></Animated.View>
    </Pressable>
  );
}
