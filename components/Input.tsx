import { ScrollView, TextInput } from "react-native";
import colors from "@/constants/colors";
import { useTheme } from "@/context/ThemeProvider";
import { useRef } from "react";

type InputPropsType = {
  editable?: boolean;
  styles?: string;
  value?: string;
};

export default function Input({
  editable = true,
  styles,
  value,
}: InputPropsType) {
  const { isDark } = useTheme();
  const scrollViewRef = useRef<ScrollView | null>(null);

  return (
    <ScrollView
      horizontal={false}
      className="h-20"
      ref={scrollViewRef}
      onContentSizeChange={() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }}
    >
      <TextInput
        value={value}
        className={`px-4 py-2 text-4xl ${
          isDark ? "text-compliment" : "text-dominant"
        } text-right ${
          value != null && value?.length >= 20 ? "text-3xl" : "text-4xl"
        } ${styles}`}
        multiline={true}
        editable={editable}
        cursorColor={colors.compliment}
        focusable={false}
        showSoftInputOnFocus={false}
      />
    </ScrollView>
  );
}
