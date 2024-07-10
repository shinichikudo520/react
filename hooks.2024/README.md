<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [React Hooks](#react-hooks)
  - [类与 Hooks 的差异](#类与-hooks-的差异)
  - [相关概念](#相关概念)
  - [注意事项](#注意事项)
  - [常见 hook](#常见-hook)
    - [1. useState](#1-usestate)
    - [2. useEffect](#2-useeffect)
    - [3. useMemo](#3-usememo)
    - [4. useCallback](#4-usecallback)
    - [5. memo](#5-memo)
    - [6. useRef](#6-useref)
    - [7. useContext](#7-usecontext)
    - [8. useReducer](#8-usereducer)
    - [9. 创建自己的 hooks](#9-创建自己的-hooks)
    - [10. useLatest (自定义)](#10-uselatest-自定义)
  - [参考文档](#参考文档)

<!-- /code_chunk_output -->

## React Hooks

    react 钩子函数的相关 api 学习, 相比于类的形式, 钩子更轻, 代码更加简洁, 可复用性高

### 类与 Hooks 的差异

- 类: 数据跟逻辑的封装, 把数据跟操作(函数), 写在同一个 class 里面
- Hooks: 只做一件事, 返回组件的 html 代码, 不需要有其他功能

### 相关概念

- 纯函数: 只在函数内进行数据计算(换算)的函数, 例如:

```
function Hello(props) {
  return <h1>Hello, {props.name}!</h1>;
}
```

- 不纯的函数: 不止进行数据计算, 还涉及副效应操作的函数

- 副效应(side effect): 函数式编程将那些跟数据计算无关的操作, 比如生成日志、储存数据、改变应用状态等, 都称为 "副效应" （side effect）, 纯函数只有通过间接的手段(即通过其他函数的调用), 才能包含副效应

- 钩子(hook): react hooks 的目的是让组件尽量写成纯函数, 如果需要外部功能和副作用, 就使用钩子把外部代码钩进来, react hooks 就是这些钩子

### 注意事项

- 只能在组件内部的最外层调用 hook, 不要在循环, 条件判断或者子函数中调用
- 只能在 react 函数组件中调用 hook, 不要在其他的 js 函数中调用

### 常见 hook

#### 1. useState

- 作用: 为函数组件引入状态(state)
- 使用:

```
import React, { useState } from 'react'


 const [state, setState] = React.useState(initialState)

 const [name, setName] = React.useState('a')
 // name 初始值是 a
 // setName 更新方法, setName('b'); 此时 name 的值是 b
```

- 说明:

  - initialState: 初始值
  - state: 变量名称
  - setState: 更新变量的方法, 并且会触发新的渲染。同时, 在后续新的渲染中 state 值始终是最新的。有两种写法:

  ```
     setState(value);
     setState(oldValue => newValue);
  ```

  - 代码: (useState 的使用)[./my-app/src/component/useState.tsx]

#### 2. useEffect

- 作用: 引入一个副效应函数, 组件每渲染一次, 该函数就自动执行一次, 组件在网页 dom 加载完成后, 副效应函数也会执行, 常用于以下几方面

  - 订阅事件, 向服务端请求数据, 更新 DOM 等
  - 清除副作用, 当组件卸载时, 可以在函数中返回一个清除函数, 清除订阅, 定时器等副作用, 组件卸载时, react 会自动调用该函数来清除副作用

  ```
  useEffect((
     const timer = setInterval(() => {
         console.log('timer...')
     },1000);

     return () => {
         clearInterval(timer)
     };
  ) => {},[])
  ```

- 使用:

```
useEffect(()  =>  {
     // code...

}, [dependencies])
```

- 说明:

  - 第一个参数: 是回调函数, 执行副作用操作, **这个函数会在组件渲染完成后执行**
  - 第二个参数: 是一个数组 [dependencies], 表示副效应的依赖项, **表示什么情况下需要重新运行副效应函数**, 如果依赖项发生了**变化**, 会在**组件更新**后再次执行回调函数, 第二次参数的可能性作如下说明
    - 空数组 [], 表示没有依赖项, 相当于类组件的钩子函数 `componentDidMount`, 只有页面加载完成后第一次渲染组件执行
    - 非空数组, 类似于类组件的钩子函数 `componentDidUpdate`, 只有依赖项的其中一个 state 发送变化, 就重新执行
    - 不传值, 只要组件内任何一个 state 发生变化, 就重新执行, **这种做法可能会导致性能问题**

- 注意: 如果多个副效应之间没有任何关联关系, 就不应该写在一起, 比如

  - 错误写法: timeoutA 与 timeoutB 没有任何关系, 不应该写在一起

  ```
  function App() {
    const [varA, setVarA] = useState(0);
    const [varB, setVarB] = useState(0);
    useEffect(() => {
      const timeoutA = setTimeout(() => setVarA(varA + 1), 1000);
      const timeoutB = setTimeout(() => setVarB(varB + 2), 2000);

      return () => {
        clearTimeout(timeoutA);
        clearTimeout(timeoutB);
      };
    }, [varA, varB]);

    return <span>{varA}, {varB}</span>;
  }
  ```

  - 正确写法:

  ```
  function App() {
      const [varA, setVarA] = useState(0);
      const [varB, setVarB] = useState(0);

      useEffect(() => {
      const timeout = setTimeout(() => setVarA(varA + 1), 1000);
      return () => clearTimeout(timeout);
      }, [varA]);

      useEffect(() => {
      const timeout = setTimeout(() => setVarB(varB + 2), 2000);

          return () => clearTimeout(timeout);

      }, [varB]);

      return <span>{varA}, {varB}</span>;
  }

  ```

- 代码: (useState 的使用)[./my-app/src/component/useEffect.tsx]

#### 3. useMemo

- 作用: 保证函数式组件重新渲染时, 组件内的**函数调用代码**的执行是可控。会返回一个计算后得到的值并缓存, 可知道计算的依赖项, 只有当依赖项变化时, 才重新计算, 减少组件重新渲染时, 不必要的计算开销
- 使用:

```
const value = useMemo(() => {
  // code...
  return value
}, [dependencies]);
```

- 说明:

  - 第一个参数传一个函数, 用于计算, 需要有返回值
  - 第二个参数是依赖项, 是一个数组, 只有当依赖项中的数据发生变化, 才会知道传参函数, 重新计算返回一个新的值, 并缓存
  - 会通过传参函数计算返回一个值, 并缓存
  - 类似与 Vue 中的 `computed`

- 代码: (useState 的使用)[./my-app/src/component/useMemo.tsx]

- 注意: 如果 value 如果是一个函数, 写法是
  ```
  const value = useMemo(() => v => {}, []);
  ```
  上面写法很麻烦, 所以重新定义了一个 `useCallback` 来代替, 上面等价于
  ```
  const callback = useCallback(() => {},[]);
  ```

#### 4. useCallback

- 作用: 减少无效函数的定义
- 使用:
  ```
  const fn = useCallback(() => {},[dependencies])
  ```
- 说明:
  - 第一个参数是需要定义的函数
  - 第二个参数是依赖项, 只有依赖项发生变化时, 函数才会被重新定义
- 代码: (useCallback 的使用)[./my-app/src/component/useCallback.tsx]
- 注意:
  - useMemo 与 useCallback 的区别
    - useMemo 解决的是防止无效的函数调用, 返回值
    - useCallback 解决的是防止无效的函数定义, 返回函数
  - 必须配合 memo,否则不但不会提升性能，还有可能降低性能

#### 5. memo

- 作用: 对组件的 props 与上一次渲染时 props 进行浅比较, 只有当 props 变化了, 才会对组件重新进行渲染, 减少不必要的开销
- 使用:

```
const component = React.memo(() => {
  // code...

  return <>
      // html...
  </>
}, (prevProps, nextProps) => {
    return boolean;
});
```

- 说明:
  - 将函数组件用 `React.memo` 包起来即可
  - memo 只会对 props 进行浅比较, 当 props 是一个引用类型(如对象, 数组, 函数), 当引用地址发生改变时, 组件会重新渲染
    - 如果是对象, 无论属性有没有发生变化, 都会返回一个新对象, 所以可以通过第二个参数自定义比较对象的属性值是否变化来决定组件是否重新渲染
    - 如果是函数, 无论如何都会返回一个新的函数, 除非用 `useCallback` 进行处理
    - 如果是数组, 只有当返回新的数组, 才会引发组件重新渲染, 比如 `push`/`pop` 等都不会返回新数组, 所以不会引起组件重新渲染, `map`/`concat`/`slice` 等会返回新数组, 所以会引发组件重新渲染
  - 只有经常被使用，经常会被重新渲染的组件去有目标的缓存他。而不是每一个组件都缓存一下。切记切记。
- 代码: (memo 的使用)[./my-app/src/component/memo.tsx]

#### 6. useRef

- 作用: 可以在函数组件中存储/查找组件内的任意标签和数据, 它在组件 render 时, 永远保持不变, 返回的 ref 对象在组件的整个生命周期内持续存在。
- 使用:

```
 const ref: {current: any} = useRef(initialValue);
```

- 说明:
  - 返回一个 ref 对象, 有一个 current 属性, 记录存储的对象
  - initialValue 是初始化值
- 代码: (useRef 的使用)[./my-app/src/component/useRef.tsx]
- 注意:
  - 每次组件 render 时, useRef 返回的都是同一个 ref 对象
  - 当 ref 存储的对象内容发生变化时, useRef 并不会通知组件, 也就是说 ref 的变化, 不会引发组件的 render
  - 跟 vue3 中的 ref 相比
  ```
  初始化：const count = ref(0)；
  读取：count.value；
  不同点：当count.value变化时，Vue3会自动render
  ```

#### 7. useContext

- 作用: 多层级组件传值
- 使用:
  1. 使用 `const C = createContext(initialValue)` 来创建
  2. 使用 `C.Provider` 来确定共享范围
  3. 使用 `value = {{n, setN}}` 来发布内容
  4. 使用 `const {n, setN} = useContext(C)` 来获取数据
- 代码: (useContext 的使用)[./my-app/src/component/useContext.tsx]

#### 8. useReducer

- 作用: useState 的升级版, 更灵活
- 使用:
  ```
  const [state, dispatch] = useReducer(reducer, initialValue, init);
  ```
- 说明:

  1. 第一个参数 reducer 是一个函数

  ```
  const reducer = (state, action) => {
    // code...
    // state 是旧数据
    // action 是 dispatch 传入的参数
    // return 返回新数据并储存
  }
  ```

  2. 第二个参数 initialValue 是 state 初始值
  3. 第三个参数 init 是一个函数, 可选参数, 如果传入, 则 init 的返回值作为 state 初始值
  4. dispatch 用于更新 state, 传入参数 action, 会被 reducer 回调函数接收, 处理之后返回最新的数据作为 state 的值

- 代码: (useReducer 的使用)[./my-app/src/component/useReducer.tsx]

#### 9. 创建自己的 hooks

- 定义:
  ```
  const useHooks = (personId) => {
    const [loading, setLoading] = useState(true);
    const [person, setPerson] = useState({});
    useEffect(() => {
      setLoading(true);
      fetch(`https://swapi.co/api/people/${personId}/`)
        .then(response => response.json())
        .then(data => {
          setPerson(data);
          setLoading(false);
        });
    }, [personId]);
    return [loading, person];
  };
  ```
- 使用:

  ```
  const Person = ({ personId }) => {
    const [loading, person] = useHooks(personId);

    if (loading === true) {
      return <p>Loading ...</p>;
    }

    return (
      <div>
        <p>You're viewing: {person.name}</p>
        <p>Height: {person.height}</p>
        <p>Mass: {person.mass}</p>
      </div>
    );
  };
  ```

#### 10. useLatest (自定义)

- 作用: useRef 可以拿到最新值，我们可以进行简单的封装，这样做的好处是：可以随时确保获取的是最新值，并且也可以解决闭包问题
- 定义:

  ```
  export default function useLatest<T>(value: T){
    const ref = useRef(value);
    ref.current = value;

    return ref;
  }
  ```

### 参考文档

- (React Hooks 详解)[https://blog.csdn.net/duansamve/article/details/109086505]
- (useMemo useEffect 的区别)[https://blog.csdn.net/z2000ky/article/details/132773148]
- (详解 useMemo 和 React.memo 的作用)[https://blog.csdn.net/chenyajundd/article/details/137541282]
- (浅谈 React.memo 函数)[https://blog.csdn.net/weixin_43804496/article/details/130998052]
