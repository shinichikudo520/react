import React, { useCallback, useRef, useState } from "react";

export default function UseLatest() {
  console.log("UseLatest...");
  const [state, setState] = useState(0);
  const ref = useLatest<number>(0);

  const add1 = useCallback(() => {
    /** 结果永远是 1,
     * state 相当于是在函数内闭包的一个变量, 永远不会更新
     * state 永远是 0, state + 1 永远是1
     * 所以输出结果一直是 1
     */
    setState(state + 1);
    console.log("state...", state);
  }, []);
  const add2 = useCallback(() => {
    ref.current += 1;
    console.log("ref...", ref.current);
  }, []);
  return (
    <>
      <h1>UseLatest</h1>
      <button onClick={add1}>state+</button>
      <button onClick={add2}>ref+</button>
    </>
  );
}

function useLatest<T>(value: T): React.MutableRefObject<T> {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}
