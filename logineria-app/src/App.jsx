import CircuitCanvas from "./page-components/CircuitCanvas";
import MainMenu from "./page-components/MainMenu";
import PointerComponent from "./animations/PointerComponent.jsx";
import "./animations/animations.js";
import "./styles/main.css";

import { useState } from "react";
import CustomConfirmDialog from "./animations/CustomConfirmDialog.jsx";

const App = () => {
      const [mode, setMode] = useState('idle');
      const [nodes, setNodes] = useState([]);
      const [selection, setSelection] = useState([]);
      const [wires, setWires] = useState([]);
      const [wireStart, setWireStart] = useState(null);
      const state = { mode, setMode, nodes, setNodes, selection, setSelection, wires, setWires, wireStart, setWireStart };

  return (
    <>
      <main className="app-container">
        <CustomConfirmDialog message="Are you sure you want to continue without saving?" />
        <PointerComponent state={state} />
        <CircuitCanvas state={state} />
        <MainMenu state={state} />
      </main>
    </>
  )
}

export default App
