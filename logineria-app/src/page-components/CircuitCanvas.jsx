import { Stage, Layer, Line } from "react-konva";
import "../styles/canvas.css";

import WireComponent from "../canvas-components/WireComponent.jsx";
import LogicComponent from "../canvas-components/LogicComponent.jsx";
import { addNode, addWire } from "../logic/canvasFunctions.js";

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
                <Stage type="Stage" className="canvas-stage" id="canvas-stage" width={stageWidth} height={stageHeight} scale={{x: 1, y: 1}}
                    onClick={(e) => {
                            if(state.mode !== 'WIRE'){
                                addNode(e, state);
                            }

                            if(state.mode === 'WIRE'){
                                addWire(e, state);
                            }
                        }}
                    >
                    <Layer listening={false}>{lines}</Layer>
                    <Layer>
                        {state.wires.map((wire) => { return <WireComponent key={wire.wireId} wire={wire} state={state} />; })}
                    </Layer>
                    <Layer>
                        {state.nodes.map((node) => { return <LogicComponent key={node.id} node={node} state={state} />; })}
                    </Layer>
                </Stage>
            </section> 
        </>
    )
};

export default CircuitCanvas;