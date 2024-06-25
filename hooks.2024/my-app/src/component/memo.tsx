import React, { useCallback, useState } from "react";

export default function Memo() {
  console.log("memo...");

  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);
  const [person, setPerson] = useState({ name: "张三", age: 18 });
  const [list, setList] = useState([1, 2, 3]);

  const add = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const setName = useCallback(() => {
    console.log("setName...");
    setPerson({ name: person.name + 1, age: person.age });
  }, [person]);
  const setAge = useCallback(() => {
    console.log("setAge...");
    setPerson({ name: person.name, age: person.age + 1 });
  }, [person]);

  return (
    <>
      <h2>Memo</h2>
      <div>count:{count}</div>
      <div>show:{JSON.stringify(show)}</div>
      <Button onClick={() => setCount(count + 1)} title="普通点击" />
      <Button onClick={add} title="useCallback" />
      {/* 当点击切换按钮的时候，没有经过 useCallback封装的函数会再次刷新，而进过过
      useCallback包裹的函数不会被再次刷新 */}
      <button
        onClick={() => {
          setShow(!show);
        }}
      >
        切换 show
      </button>
      <br />
      <Person1 person={person} />
      <br />
      <Person2 person={person} />
      <br />
      <Name person={person} />
      <br />
      <Age person={person} />
      <button onClick={setName}>修改名字</button>
      <button onClick={setAge}>修改年龄</button>
      {/* 只有当 list 返回新数组时, 页面数据才会更新 */}
      <div>list:{list}</div>
      <List list={list} />
      <button
        onClick={() => {
          list.push(list[list.length - 1] + 1);
          setList(list);
          console.log("push...", list);
        }}
      >
        push
      </button>
      <button
        onClick={() => {
          const newList = list.concat([list[list.length - 1] + 1]);
          setList(newList);
          console.log("concat...", list);
        }}
      >
        concat
      </button>
    </>
  );
}

const Button = React.memo((props: { onClick: () => void; title: string }) => {
  console.log(props.title);
  return (
    <>
      <button onClick={props.onClick}>{props.title}</button>
    </>
  );
});

const Person1 = React.memo(
  (props: { person: { name: string; age: number } }) => {
    console.log("Person1 组件...");
    return (
      <>
        <div>Person1 组件</div>
        <div>name:{props.person.name}</div>
        <div>age:{props.person.age}</div>
      </>
    );
  }
);

const Person2 = React.memo(
  (props: { person: { name: string; age: number } }) => {
    console.log("Person2 组件...");
    return (
      <>
        <div>Person2 组件</div>
        <div>name:{props.person.name}</div>
        <div>age:{props.person.age}</div>
      </>
    );
  },
  (prevProps, nextProps) => {
    const { person: p1 } = prevProps;
    const { person: p2 } = nextProps;
    return p1.name === p2.name && p1.age === p2.age;
  }
);

const Name = React.memo(
  (props: { person: { name: string; age: number } }) => {
    console.log("Name 组件...");
    return (
      <>
        <div>Name 组件</div>
        <div>name:{props.person.name}</div>
      </>
    );
  },
  (prevProps, nextProps) => {
    const { person: p1 } = prevProps;
    const { person: p2 } = nextProps;
    return p1.name === p2.name;
  }
);

const Age = React.memo(
  (props: { person: { name: string; age: number } }) => {
    console.log("Age 组件...");
    return (
      <>
        <div>Age 组件</div>
        <div>age:{props.person.age}</div>
      </>
    );
  },
  (prevProps, nextProps) => {
    const { person: p1 } = prevProps;
    const { person: p2 } = nextProps;
    return p1.age === p2.age;
  }
);

const List = React.memo((props: { list: Array<number> }) => {
  console.log("List 组件...");

  return (
    <>
      <div>List 组件</div>
      <ul>
        {props.list.map((i, index) => (
          <li key={index}>{i}</li>
        ))}
      </ul>
    </>
  );
});
