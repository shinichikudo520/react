import "./App.css";
import UseCallback from "./component/useCallback";
import UseContext from "./component/useContext";
import UseEffect from "./component/useEffect";
import UseMemo from "./component/useMemo";
import UseRef from "./component/useRef";
import UseState from "./component/useState";
import UseReducer from "./component/useReducer";
import Memo from "./component/memo";
import UseLatest from "./component/useLatest";

function App() {
  return (
    <div className="App">
      <h1>React Hooks</h1>
      <h2>一、UseState 组件</h2>
      <UseState />
      <hr />
      <h2>二、UseEffect 组件</h2>
      <UseEffect />
      <hr />
      <h2>三、UseMemo 组件</h2>
      <UseMemo />
      <hr />
      <h2>四、UseCallback 组件</h2>
      <UseCallback />
      <hr />
      <h2>五、Memo 组件</h2>
      <Memo />
      <hr />
      <h2>六、UseRef 组件</h2>
      <UseRef />
      <hr />
      <h2>七、UseContext 组件</h2>
      <UseContext />
      <hr />
      <h2>八、UseReducer 组件</h2>
      <UseReducer />
      <h2>九、UseLatest 组件</h2>
      <UseLatest />
    </div>
  );
}

export default App;
