import React, { useReducer } from "react";
// const action = {
//   increment: "increase",
//   decrement: "decrease",
//   reset: "reset",
// };
const UseReducerHook = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "increament":
        return { count: state.count + 1 };
      case "decreament":
        return { count: state.count - 1 };
      case "reset":
        return { count: 0 };
    }
  };
  const [state, dispatch] = useReducer(reducer, { count: 100 });
  return (
    <div>
      <h1>{state.count}</h1>
      <button onClick={() => dispatch({ type: "increament" })}>
        Icreament
      </button>
      <button onClick={() => dispatch({ type: "decreament" })}>
        Decreament
      </button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
};

export default UseReducerHook;
