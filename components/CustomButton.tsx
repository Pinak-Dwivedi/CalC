import { useTheme } from "@/context/ThemeProvider";
import { ReactNode } from "react";
import { Text, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  WithTimingConfig,
  useAnimatedStyle,
} from "react-native-reanimated";

type CustomButtonPropsType = {
  title?: string;
  containerStyles?: string;
  buttonStyles?: string;
  textStyles?: string;
  handleClick?: () => void;
  children?: ReactNode;
};

export default function CustomButton({
  title,
  containerStyles,
  buttonStyles,
  textStyles,
  handleClick,
  children,
}: CustomButtonPropsType) {
  const { isDark } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animationOptions: WithTimingConfig = {
    duration: 100,
    easing: Easing.inOut(Easing.ease),
  };

  return (
    <TouchableOpacity
      className={`${containerStyles}`}
      activeOpacity={0.5}
      onPressIn={() => {
        scale.value = withTiming(0.9, animationOptions);
      }}
      onPress={handleClick}
      onPressOut={() => {
        scale.value = withTiming(1, animationOptions);
      }}
    >
      <Animated.View
        className={`flex-grow items-center justify-center border-2 border-accent p-4 rounded-xl ${buttonStyles}`}
        style={animatedStyles}
      >
        {children != null ? (
          children
        ) : (
          <Text
            className={`${
              isDark ? "text-compliment" : "text-dominant"
            } text-3xl ${textStyles}`}
          >
            {title}
          </Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}
