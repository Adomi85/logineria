import { useState, useEffect, useRef } from "react";
import { Stage, Layer } from "react-konva";
import "../styles/canvas.css";

import { LogicComponent, WireComponent } from "../canvas-components/CreateComponents.jsx";
import { addNode, addWire } from "../logic/canvasFunctions.js";

import CanvasToolbar from "../canvas-components/CanvasToolbar.jsx";
import CanvasToolribbon from "../canvas-components/CanvasToolribbon.jsx";

const CircuitCanvas = () => {
    const sceneWidth = 1000;
    const sceneHeight = 500;

    const [stageSize, setStageSize] = useState({
        width: sceneWidth,
        height: sceneHeight,
        scale: 1
    });

    const containerRef = useRef(null);

    const updateSize = () => {
        if (!containerRef.current) return;

        const containerWidth  = containerRef.current.offsetWidth;
        const scale = containerWidth / sceneWidth;

        setStageSize({
            width: sceneWidth * scale,
            height: sceneHeight * scale,
            scale: scale
        });
    };

    useEffect(() => {
        updateSize();
        window.addEventListener('resize', updateSize);

        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []);

    const [mode, setMode] = useState('idle');
    const [nodes, setNodes] = useState([]); 
    const [selection, setSelection] = useState([]);
    const [wires, setWires] = useState([]);
    const [wireStart, setWireStart] = useState(null);
    
    return (
        <>
            <CanvasToolribbon state={{ selection, setSelection, nodes, setNodes, wires, setWires }} />
            <section className="canvas-wrapper">
                <CanvasToolbar mode={mode} setMode={setMode}/>
                <div ref={containerRef} className="canvas-stage-container">
                    <Stage className="canvas-stage" width={stageSize.width} height={stageSize.height} scaleX={stageSize.scale} scaleY={stageSize.scale} 
                    onClick={(e) => {
                            if(mode !== 'WIRE'){
                                addNode(e, {mode, setMode, nodes, setNodes, selection, setSelection, wires, setWires })
                            }
                            
                            if(mode === 'WIRE'){
                                addWire(e, {mode, setMode, wires, setWires, wireStart, setWireStart, selection, setSelection})
                            }
                        }}>
                        <Layer >
                            {nodes.map((node) => <LogicComponent key={node.id} node={node} state={{ mode, setMode, nodes, setNodes, selection, setSelection, wires, setWires }} />)}
                            {wires.map((wire) => <WireComponent key={wire.wireId} wire={wire} state={{ mode, setMode, wires, setWires, wireStart, setWireStart, selection, setSelection }} />)}
                        </Layer>
                    </Stage>
                </div>
            </section>
        </>
    )
};

export default CircuitCanvas;