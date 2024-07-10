import React, { createContext, useContext, useState } from "react";

const C = createContext(null as any);

export default function UseContext() {
  console.log("UseContext...");

  const [n, setN] = useState(0);

  return (
    <>
      <C.Provider value={{ n, setN }}>
        <h2>useContext</h2>
        <div>n: {n}</div>
        <First />
      </C.Provider>
    </>
  );
}

function First() {
  const { n, setN } = useContext(C);

  return (
    <>
      <h3>first layer</h3>
      <div>n: {n}</div>
      <button onClick={() => setN(n + 1)}>+1</button>
      <Second />
    </>
  );
}
function Second() {
  const { n, setN } = useContext(C);

  return (
    <>
      <h4>second layer</h4>
      <div>n: {n}</div>
      <button onClick={() => setN(n - 1)}>-1</button>
      <Third />
    </>
  );
}
function Third() {
  const { n, setN } = useContext(C);

  return (
    <>
      <h5>third layer</h5>
      <div>n: {n}</div>
      <button onClick={() => setN(n * 2)}>*2</button>
    </>
  );
}
