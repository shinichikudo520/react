import "./App.css";
import UseCallback from "./component/useCallback";
import UseContext from "./component/useContext";
import UseEffect from "./component/useEffect";
import UseMemo from "./component/useMemo";
import UseRef from "./component/useRef";
import UseState from "./component/useState";
import UseReducer from "./component/useReducer";

function App() {
  return (
    <div className="App">
      <h1>React Hooks</h1>
      <UseState />
      <hr />
      <UseEffect />
      <hr />
      <UseMemo />
      <hr />
      <UseCallback />
      <hr />
      <UseRef />
      <hr />
      <UseContext />
      <hr />
      <UseReducer />
    </div>
  );
}

export default App;
