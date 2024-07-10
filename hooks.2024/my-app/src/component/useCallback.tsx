import React, { useCallback, useState } from "react";

export default function UseCallback() {
  console.log("UseCallback...");

  const [count, setCount] = useState(0);
  const [num, setNum] = useState(0);

  /**
   * 不管是 count 还是 num 改变, 都会导致组件重新 render
   * 组件重新 render, 都会导致 showCount 被重新定义, 属于不必要的性能损耗
   */
  const showCount = () => {
    console.log("showCount...", count);
  };
  /**
   * 使用 useCallback, 则 showCount1 会被缓存起来
   * 只有当依赖项 count 发生改变, 导致组件重新 render 时, showCount1 才会被重新定义
   */
  const showCount1 = useCallback(() => {
    console.log("showCount1...", count);
  }, [count]);
  return (
    <>
      <h2>useCallback</h2>
      <h3>
        count:{count}---num:{num}
      </h3>
      <button onClick={showCount}>showCount</button>
      <button onClick={showCount1}>showCount1</button>
      <button onClick={() => setCount(count + 3)}>count + 3</button>
      <button onClick={() => setNum(num * 10)}>num * 10</button>
    </>
  );
}
