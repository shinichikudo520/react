import React, { useMemo, useState } from "react";

export default function UseMemo() {
  console.log("UseMemo...");
  console.log("父组件...");

  const [name, setName] = useState("aaa");
  const [age, setAge] = useState(12);

  return (
    <>
      <h2>useMemo</h2>
      <button onClick={() => setName(name + 1)}>修改 name</button>
      <button onClick={() => setAge(age + 1)}>修改 age</button>

      <Son name={name} age={age} />
    </>
  );
}

function Son({ name, age }: { name: string; age: number }) {
  console.log("子组件...");

  function isAdult(age1: number) {
    console.log("调用 isAdult...");
    return age1 >= 18 ? "已成年" : "未成年";
  }

  /**
   * 写在函数组件里的【函数调用代码】
   * 只要组件重新渲染, 那么就会被调用一次, 即使只修改了 name
   */
  let adult1 = (() => {
    console.log(1111111, "name/age 发生改变, 都会调用");
    return isAdult(age);
  })();

  /** 加上 useMemo */
  let adult2 = useMemo(() => {
    console.log(2222222, "只有 age 发生改变, 才会调用");
    return isAdult(age);
  }, [age]);

  return (
    <>
      <h3>useMemo 子组件</h3>
      <p>姓名: {name}</p>
      <p>年龄: {age}</p>
      <p>是否成年:{adult1}</p>
      <p>是否成年:{adult2}</p>
    </>
  );
}
