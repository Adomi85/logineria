import CircuitCanvas from "./page-components/CircuitCanvas";
import MainMenu from "./page-components/MainMenu";
import "./logic/pointerFunctions.js";
import "./styles/main.css";

import { useState } from "react";

const App = () => {
      const [mode, setMode] = useState('idle');
      const [nodes, setNodes] = useState([]);
      const [selection, setSelection] = useState([]);
      const [wires, setWires] = useState([]);
      const [wireStart, setWireStart] = useState(null);
      const state = { mode, setMode, nodes, setNodes, selection, setSelection, wires, setWires, wireStart, setWireStart};

  return (
    <>
      <div className="app-container">
        <CircuitCanvas state={state} />
        <MainMenu state={state} />
      </div>
    </>
  )
}

export default App
