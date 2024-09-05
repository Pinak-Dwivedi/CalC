import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import Input from "@/components/Input";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import colors from "@/constants/colors";
import ToggleTheme from "@/components/ToggleTheme";
import { useTheme } from "@/context/ThemeProvider";
import useCalculator, { HistoryItemType } from "@/hooks/useCalculator";
import { ActionTypes, OperatorType } from "@/hooks/useCalculator";
import History from "@/components/History";
import { useState } from "react";

const iconsSize = 25;
const buttonsGap = 10;

export default function Calculator() {
  const [
    { operand1: screen1, operand2: mainScreen, operator, isOperand1, history },
    dispatch,
  ] = useCalculator();

  const [showHistory, setShowHistory] = useState(false);

  const { isDark } = useTheme();

  const iconsThemeColor = isDark ? colors.compliment : colors.dominant;

  function handleNumberInput(num: number) {
    dispatch({
      type: ActionTypes.ADD_OPERAND,
      payload: num,
    });
  }

  function handleOperatorInput(op: OperatorType) {
    dispatch({
      type: ActionTypes.ADD_OPERATOR,
      payload: op,
    });
  }

  function handleClear() {
    dispatch({
      type: ActionTypes.CLEAR,
    });
  }

  function handleAllClear() {
    dispatch({
      type: ActionTypes.ALL_CLEAR,
    });
  }

  function handleAddDecimal() {
    dispatch({
      type: ActionTypes.ADD_DECIMAL,
    });
  }

  function handleCalculate() {
    dispatch({
      type: ActionTypes.CALCULATE,
    });
  }

  function toggleShowHistory() {
    setShowHistory(!showHistory);
  }

  function handleSelectHistory({
    operand1,
    operand2,
    operator,
  }: HistoryItemType) {
    dispatch({
      type: ActionTypes.LOAD_HISTORY,
      payload: {
        operand1,
        operand2,
        operator,
      },
    });
  }

  function handleClearHistory() {
    dispatch({ type: ActionTypes.CLEAR_HISTORY });
  }

  return (
    <SafeAreaView
      className={`${isDark ? "bg-dominant" : "bg-compliment"} flex-1`}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingVertical: 10 }}>
        {/* header */}
        <View className="flex-row items-center justify-between px-4">
          <Text className={`text-3xl text-accent font-extrabold`}>CalC</Text>

          {/* theme toggle */}
          <ToggleTheme />
        </View>

        {/* screens */}
        <View className="mt-4">
          <Input
            value={isOperand1 && operator ? `${screen1}${operator}` : ""}
            editable={false}
            styles={`${
              screen1 != null &&
              operator != null &&
              (screen1 + operator).length >= 20
                ? "text-2xl"
                : "text-3xl"
            }
            ${isDark ? "text-compliment/50" : "text-dominant/50"}
            `}
          />

          <View
            className={`border-b-2 my-2 ${
              isDark
                ? "border-b-compliment/40 text-compliment/50"
                : "border-b-dominant/40 text-dominant/50"
            }`}
          />

          <Input value={mainScreen == null ? `${screen1}` : `${mainScreen}`} />
        </View>

        {/* history and delete */}
        <View
          className={`mt-2 flex-row justify-between px-4 border-b-2 ${
            isDark ? "border-b-compliment/20" : "border-b-dominant/20"
          }`}
        >
          <CustomButton buttonStyles="border-0" handleClick={toggleShowHistory}>
            <FontAwesome5
              name="history"
              size={iconsSize}
              color={showHistory ? colors.accent : iconsThemeColor}
            />
          </CustomButton>

          <CustomButton
            buttonStyles="border-0"
            handleClick={() => handleClear()}
          >
            <FontAwesome6
              name="delete-left"
              size={iconsSize}
              color={iconsThemeColor}
            />
          </CustomButton>
        </View>

        <View className="flex-1">
          {/* History */}
          <History
            showHistory={showHistory}
            history={history}
            handleSelectHistory={handleSelectHistory}
            handleClearHistory={handleClearHistory}
          />

          {/* buttons */}
          <View className="mt-10 px-4" style={{ gap: buttonsGap }}>
            {/* button group */}
            <View className="flex-row" style={{ gap: buttonsGap }}>
              <CustomButton
                title={"AC"}
                containerStyles="flex-grow"
                handleClick={() => handleAllClear()}
              />
              <CustomButton
                containerStyles="flex-grow"
                handleClick={() => handleOperatorInput("%")}
              >
                <FontAwesome5
                  name="percent"
                  size={iconsSize}
                  color={iconsThemeColor}
                />
              </CustomButton>

              <CustomButton
                containerStyles="flex-grow"
                handleClick={() => handleOperatorInput("÷")}
              >
                <FontAwesome5
                  name="divide"
                  size={iconsSize}
                  color={iconsThemeColor}
                />
              </CustomButton>
            </View>

            {/* button group */}
            <View className="flex-row" style={{ gap: buttonsGap }}>
              <CustomButton
                title={"7"}
                containerStyles="flex-grow"
                handleClick={() => handleNumberInput(7)}
              />
              <CustomButton
                title={"8"}
                containerStyles="flex-grow"
                handleClick={() => handleNumberInput(8)}
              />
              <CustomButton
                title={"9"}
                containerStyles="flex-grow"
                handleClick={() => handleNumberInput(9)}
              />
              <CustomButton
                containerStyles="flex-grow"
                handleClick={() => handleOperatorInput("×")}
              >
                <FontAwesome5
                  name="times"
                  size={iconsSize}
                  color={iconsThemeColor}
                />
              </CustomButton>
            </View>

            {/* button group */}
            <View className="flex-row" style={{ gap: buttonsGap }}>
              <CustomButton
                title={"4"}
                containerStyles="flex-grow"
                handleClick={() => handleNumberInput(4)}
              />
              <CustomButton
                title={"5"}
                containerStyles="flex-grow"
                handleClick={() => handleNumberInput(5)}
              />
              <CustomButton
                title={"6"}
                containerStyles="flex-grow"
                handleClick={() => handleNumberInput(6)}
              />
              <CustomButton
                containerStyles="flex-grow"
                handleClick={() => handleOperatorInput("-")}
              >
                <FontAwesome5
                  name="minus"
                  size={iconsSize}
                  color={iconsThemeColor}
                />
              </CustomButton>
            </View>

            {/* button group */}
            <View className="flex-row" style={{ gap: buttonsGap }}>
              <CustomButton
                title={"1"}
                containerStyles="flex-grow"
                handleClick={() => handleNumberInput(1)}
              />
              <CustomButton
                title={"2"}
                containerStyles="flex-grow"
                handleClick={() => handleNumberInput(2)}
              />
              <CustomButton
                title={"3"}
                containerStyles="flex-grow"
                handleClick={() => handleNumberInput(3)}
              />
              <CustomButton
                containerStyles="flex-grow"
                handleClick={() => handleOperatorInput("+")}
              >
                <FontAwesome5
                  name="plus"
                  size={iconsSize}
                  color={iconsThemeColor}
                />
              </CustomButton>
            </View>

            {/* button group */}
            <View className="flex-row" style={{ gap: buttonsGap }}>
              <CustomButton
                title={"0"}
                containerStyles="flex-grow"
                handleClick={() => handleNumberInput(0)}
              />
              <CustomButton
                title={"."}
                containerStyles="flex-grow"
                textStyles="font-bold"
                handleClick={() => handleAddDecimal()}
              />
              <CustomButton
                containerStyles="flex-grow"
                buttonStyles="bg-accent"
                handleClick={() => handleCalculate()}
              >
                <FontAwesome5
                  name="equals"
                  size={iconsSize}
                  color={colors.compliment}
                />
              </CustomButton>
            </View>
          </View>
        </View>
      </ScrollView>

      <StatusBar style={isDark ? "light" : "dark"} />
    </SafeAreaView>
  );
}
