import React, { useState } from "react";

export default function UseState() {
  console.log("UseState...");

  const [num, setNum] = useState(0); // 初始值为 0
  return (
    <div>
      <h2>useState</h2>
      <div>
        当前数量: {num}&nbsp;&nbsp;&nbsp;
        <button onClick={() => setNum(num + 1)}>增加</button>&nbsp;&nbsp;&nbsp;
        <button onClick={() => setNum(Math.max(0, num - 1))}>减少</button>
      </div>
    </div>
  );
}
