import React, { useCallback, useRef } from "react";

export default function UseRef() {
  console.log("UseRef...");

  const input: { current: HTMLInputElement } = useRef(null as any);
  const click = useCallback(() => {
    input.current.focus();
  }, []);

  return (
    <>
      <h2>useRef</h2>
      <input type="text" name="" id="" ref={input} />
      <button onClick={click}>focus the inout</button>
    </>
  );
}
