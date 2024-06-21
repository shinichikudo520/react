import { useEffect, useState } from "react";

export default function UseEffect() {
  console.log("UseEffect...");

  const [state1, setState1] = useState(0);
  const [state2, setState2] = useState(0);
  useEffect(() => {
    console.log("不传依赖项...任意 state 变化都会执行");
  });
  useEffect(() => {
    console.log("依赖 state1, state1 改变时执行");
  }, [state1]);
  useEffect(() => {
    console.log("依赖 state2, state2 改变时执行");
  }, [state2]);
  useEffect(() => {
    console.log(
      "依赖项是空数组, 任何 state 变化都不会执行, 只在初始化时执行一次"
    );
  }, []);
  return (
    <div>
      <h2>useEffect</h2>
      <div>
        state1: {state1}&nbsp;&nbsp;&nbsp;
        <button onClick={() => setState1(state1 + 1)}>增加</button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={() => setState1(Math.max(0, state1 - 1))}>减少</button>
      </div>
      <div>
        state2: {state2}&nbsp;&nbsp;&nbsp;
        <button onClick={() => setState2(state2 + 1)}>增加</button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={() => setState2(Math.max(0, state2 - 1))}>减少</button>
      </div>
    </div>
  );
}
