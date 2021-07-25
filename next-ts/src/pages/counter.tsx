import React from "react";
import { useCounter } from "../contexts/count-context";
import { Button, Space } from "antd";
function Counter() {
  const { state, dispatch } = useCounter();
  return (
    <div>
      <h1>{state.count}</h1>
      <Space>
        <Button
          onClick={() => dispatch({ type: "increment", payload: { count: 1 } })}
        >
          Increment
        </Button>
        <Button
          onClick={() => dispatch({ type: "decrement", payload: { count: 1 } })}
        >
          Decrement
        </Button>
        <Button onClick={() => dispatch({ type: "reset" })}>Reset</Button>
      </Space>
    </div>
  );
}

export default Counter;
