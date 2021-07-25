import React, {
  useReducer,
  PropsWithChildren,
  Dispatch,
  useContext,
} from "react";

type Action<
  T extends any,
  Payload extends object | undefined
> = Payload extends undefined ? { type: T } : { type: T; payload: Payload };

type incrementAction = Action<"increment", { count: number }>;
type decrementAction = Action<"decrement", { count: number }>;
type resetAction = Action<"reset", undefined>;

type CounActions = incrementAction | decrementAction | resetAction;

interface State {
  count: number;
}

const initialState: State = {
  count: 0,
};

function countReducer(state: State, action: CounActions) {
  switch (action.type) {
    case "decrement": {
      return {
        ...state,
        count: state.count - action.payload.count,
      };
    }
    case "increment": {
      return {
        ...state,
        count: state.count + action.payload.count,
      };
    }
    case "reset": {
      return initialState;
    }
  }
}

const CountContext = React.createContext<{
  state: State;
  dispatch: Dispatch<CounActions>;
}>(undefined!);

function CountProvider({ children }: PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(countReducer, initialState);
  return (
    <CountContext.Provider value={{ state, dispatch }}>
      {children}
    </CountContext.Provider>
  );
}

export const useCounter = () => {
  return useContext(CountContext);
};

export default CountProvider;
