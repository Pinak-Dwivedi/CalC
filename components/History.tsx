import { useTheme } from "@/context/ThemeProvider";
import { useEffect } from "react";
import { ScrollView, View, Text, useWindowDimensions } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  WithTimingConfig,
} from "react-native-reanimated";
import CustomButton from "./CustomButton";
import { HistoryItemType, HistoryType } from "@/hooks/useCalculator";

type HistoryPropsType = {
  showHistory: boolean;
  history: HistoryType;
  handleSelectHistory: (item: HistoryItemType) => void;
  handleClearHistory: () => void;
};

export default function History({
  showHistory,
  history,
  handleSelectHistory,
  handleClearHistory,
}: HistoryPropsType) {
  const { width } = useWindowDimensions();

  const leftShow = 0;
  const leftHide = width * -1;

  const left = useSharedValue(showHistory ? leftShow : leftHide);

  const animationOptions: WithTimingConfig = {
    duration: 150,
    easing: Easing.linear,
  };

  const { isDark } = useTheme();

  useEffect(() => {
    if (showHistory) left.value = withTiming(leftShow, animationOptions);
    else left.value = withTiming(leftHide, animationOptions);
  }, [showHistory]);

  return (
    <Animated.View
      className={`absolute h-full w-full z-10 px-4 py-4 ${
        isDark ? "bg-dominant" : "bg-compliment"
      }`}
      style={{
        left: left,
      }}
    >
      {/* header */}
      <View className="flex-row justify-between items-center mb-8">
        <Text
          className={`text-3xl ${isDark ? "text-compliment" : "text-dominant"}`}
        >
          History
        </Text>

        <CustomButton
          title="Clear"
          textStyles="text-xl"
          buttonStyles="px-2 py-1"
          handleClick={handleClearHistory}
        />
      </View>

      <ScrollView>
        {history?.length > 0 ? (
          history.map((item, index) => {
            const { operand1, operand2, operator, result } = item;

            return (
              <CustomButton
                key={index}
                handleClick={() => handleSelectHistory(item)}
                title={`${operand1} ${operator} ${operand2} = ${result}`}
                buttonStyles={`mb-4 border-0 items-start ${
                  isDark
                    ? "text-compliment bg-compliment/20"
                    : "text-dominant bg-dominant/20"
                }`}
                textStyles="text-2xl font-normal"
              />
            );
          })
        ) : (
          <Text
            className={`text-2xl ${
              isDark ? "text-compliment/60" : "text-dominant/60"
            }`}
          >
            No items in history!
          </Text>
        )}
      </ScrollView>
    </Animated.View>
  );
}
