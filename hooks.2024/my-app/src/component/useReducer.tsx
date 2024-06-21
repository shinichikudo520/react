import { useCallback, useReducer } from "react";

export default function UseReducer() {
  console.log("UseReducer...");

  const initialState = {
    num: 0,
  };
  const reducer = useCallback(
    (state = initialState, action: { type: "add" | "sub"; count: number }) => {
      switch (action.type) {
        case "add":
          return { num: state.num + action.count };
        case "sub":
          return { num: state.num - action.count };
        default:
          return state;
      }
    },
    []
  );
  const init = useCallback(
    () => ({
      num: 5,
    }),
    []
  );
  const [state, dispatch] = useReducer(reducer, initialState, init);

  return (
    <>
      <h2>UseReducer</h2>
      <div>state: {state.num}</div>
      <div>
        <button onClick={() => dispatch({ type: "add", count: 1 })}>+1</button>
        <button onClick={() => dispatch({ type: "sub", count: 1 })}>-1</button>
      </div>
    </>
  );
}
