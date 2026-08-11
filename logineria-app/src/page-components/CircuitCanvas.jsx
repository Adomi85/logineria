import { Stage, Layer, Line } from "react-konva";
import "../styles/canvas.css";

import { LogicComponent, WireComponent } from "../canvas-components/CreateComponents.jsx";
import { addNode, addWire } from "../logic/canvasFunctions.js";
import { pointerVisibility } from "../logic/pointerFunctions.js";
import PointerComponent from "./PointerComponent.jsx";

const CircuitCanvas = ({state}) => {
    const stageWidth = window.innerWidth * 2.5;
    const stageHeight = window.innerHeight * 2.5;
    const gridSize = 30;
    const lines = [];

    for(let i = 0; i < stageWidth; i += gridSize){
        lines.push(
        <Line
            key={`v-${i}`} 
            points={[i, 0, i, stageHeight]} 
            stroke="#ffffffb6" 
            strokeWidth={1} 
        />);
    }

    for(let j = 0; j < stageHeight; j += gridSize){
        lines.push(
        <Line 
            key={`h-${j}`} 
            points={[0, j, stageWidth, j]} 
            stroke="#ffffffb6" 
            strokeWidth={1} 
        />);
    }
    
    return (
        <>
            <section className="canvas-container">
                <PointerComponent />
                <Stage className="canvas-stage" width={stageWidth} height={stageHeight} scale={{x: 1, y: 1}}
                    onMouseUp={(e) => {
                            if(state.mode !== 'WIRE'){
                                addNode(e, state);
                            }

                            if(state.mode === 'WIRE'){
                                addWire(e, state);
                            }
                        }}
                    onMouseDown={() => {
                        if(state.mode !== 'idle'){
                            pointerVisibility(state.mode);
                        }
                    }}>
                    <Layer listening={false}>{lines}</Layer>
                    <Layer >
                        {state.nodes.map((node) => <LogicComponent key={node.id} node={node} state={state} />)}
                        {state.wires.map((wire) => <WireComponent key={wire.wireId} wire={wire} state={state} />)}
                    </Layer>
                </Stage>
            </section> 
        </>
    )
};

export default CircuitCanvas;