import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useReducer } from "react";

const operators = ["+", "-", "×", "÷", "%"] as const;
export type OperatorType = (typeof operators)[number];

type OperandType = string | null;

export type HistoryItemType = {
  operand1: string;
  operand2: string;
  operator: OperatorType;
  result: string;
};

export type HistoryType = HistoryItemType[];

type CalculatorStateType = {
  operand1: OperandType;
  operand2: OperandType;
  operator: OperatorType | null;
  isOperand1: boolean;
  history: HistoryType;
};

export enum ActionTypes {
  ADD_OPERAND = "ADD_OPERAND",
  ADD_OPERATOR = "ADD_OPERATOR",
  ADD_DECIMAL = "ADD_DECIMAL",
  CALCULATE = "CALCULATE",
  CLEAR = "CLEAR",
  ALL_CLEAR = "ALL_CLEAR",
  SET_HISTORY = "SET_HISTORY",
  LOAD_HISTORY = "LOAD_HISTORY",
  CLEAR_HISTORY = "CLEAR_HISTORY",
}

// need to update it
type ActionType =
  | {
      type: ActionTypes.ADD_OPERAND;
      payload: number;
    }
  | {
      type: ActionTypes.ADD_OPERATOR;
      payload: OperatorType;
    }
  | {
      type: ActionTypes.ADD_DECIMAL;
      payload?: null;
    }
  | {
      type: ActionTypes.CALCULATE;
      payload?: null;
    }
  | {
      type: ActionTypes.CLEAR;
      payload?: null;
    }
  | {
      type: ActionTypes.ALL_CLEAR;
      payload?: null;
    }
  | {
      type: ActionTypes.SET_HISTORY;
      payload: HistoryType;
    }
  | {
      type: ActionTypes.LOAD_HISTORY;
      payload: Pick<CalculatorStateType, "operand1" | "operand2" | "operator">;
    }
  | {
      type: ActionTypes.CLEAR_HISTORY;
      payload?: null;
    };

const initialCalculatorState: CalculatorStateType = {
  operand1: "0",
  operand2: null,
  operator: null,
  isOperand1: false,
  history: [],
};

function reducer(
  state: CalculatorStateType,
  action: ActionType
): CalculatorStateType {
  const { operand1, operand2, operator, isOperand1, history } = state;
  const { type, payload } = action;

  switch (type) {
    // add operand
    // thinking about limiting the number of inputs for operand e.g. 16 digits or more may be 21
    case ActionTypes.ADD_OPERAND:
      if (!isOperand1)
        return {
          ...state,
          operand1:
            operand1 === "0" || operand1 == null
              ? payload.toString()
              : operand1 + payload,
        };
      else
        return {
          ...state,
          operand2:
            operand2 === "0" || operand2 == null
              ? payload.toString()
              : operand2 + payload,
        };

    // add operator
    case ActionTypes.ADD_OPERATOR:
      if (!isOperand1)
        return {
          ...state,
          operator: payload,
          isOperand1: true,
        };

      if (operand1 != null && operand2 != null && operator != null) {
        const result = calculate(operand1, operand2, operator);
        const newHistory = [
          {
            operand1,
            operand2,
            operator,
            result,
          },
          ...history,
        ];

        if (newHistory.length >= 11) newHistory.pop();

        return {
          ...state,
          operand1: result,
          operator: payload,
          operand2: null,
          isOperand1: true,
          history: newHistory,
        };
      }

      return {
        ...state,
        operator: payload,
      };

    case ActionTypes.ADD_DECIMAL:
      if (!isOperand1)
        return {
          ...state,
          operand1:
            operand1 != null && !operand1.includes(".")
              ? operand1 + "."
              : operand1,
        };
      else
        return {
          ...state,
          operand2:
            operand2 != null && !operand2.includes(".")
              ? operand2 + "."
              : operand2,
        };

    // calculate
    case ActionTypes.CALCULATE:
      if (operand1 != null && operator != null) {
        const result = calculate(operand1, operand2, operator);
        const newHistory = [
          {
            operand1,
            operand2: operand2 != null ? operand2 : operand1,
            operator,
            result,
          },
          ...history,
        ];

        if (newHistory.length >= 11) newHistory.pop();

        return {
          ...state,
          operand1: result,
          operator: null,
          operand2: null,
          isOperand1: false,
          history: newHistory,
        };
      } else return state;

    // clear
    case ActionTypes.CLEAR:
      if (!isOperand1)
        return {
          ...state,
          operand1:
            operand1 != null && operand1.length > 1
              ? operand1.slice(0, -1)
              : "0",
        };
      else
        return {
          ...state,
          operand2:
            operand2 != null && operand2.length > 1
              ? operand2.slice(0, -1)
              : "0",
        };

    case ActionTypes.ALL_CLEAR:
      return {
        ...initialCalculatorState,
        history: history,
      };

    case ActionTypes.SET_HISTORY:
      return {
        ...state,
        history: payload,
      };

    case ActionTypes.LOAD_HISTORY:
      return {
        ...state,
        operand1: payload.operand1,
        operand2: payload.operand2,
        operator: payload.operator,
        isOperand1: true,
      };

    case ActionTypes.CLEAR_HISTORY:
      return {
        ...state,
        history: [],
      };

    default:
      return state;
  }
}

export default function useCalculator(): [
  CalculatorStateType,
  React.Dispatch<ActionType>
] {
  const [calculatorState, dispatch] = useReducer(
    reducer,
    initialCalculatorState
  );

  useEffect(() => {
    AsyncStorage.getItem("history").then((value) => {
      if (value != null) {
        dispatch({
          type: ActionTypes.SET_HISTORY,
          payload: JSON.parse(value),
        });
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("history", JSON.stringify(calculatorState.history));
  }, [calculatorState.history]);

  return [calculatorState, dispatch];
}

function isOperator(value: any): value is OperatorType {
  return operators.includes(value);
}

function calculate(
  operand1: OperandType,
  operand2: OperandType,
  operator: OperatorType
) {
  let num1 = Number(operand1);
  let num2 = operand2 != null ? Number(operand2) : Number(operand1);
  let result;

  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "×":
      result = num1 * num2;
      break;
    case "÷":
      result = num1 / num2;
      break;

    case "%":
      result = (num1 * num2) / 100;
      break;
  }

  return result.toString();
}

export type AddToHistoryType = (item: HistoryItemType) => void;
