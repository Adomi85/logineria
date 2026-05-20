import { useState, useEffect, useRef } from "react";
import { Stage, Layer } from "react-konva";
import "../styles/canvas.css";

import { createComponent } from "../canvas-components/CanvasFunctions.jsx";

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

    const [elements, setElements] = useState([]);

    function addElement(e){

        const newElement = {
            type: e.target.id,
            id: crypto.randomUUID()
        }

        setElements([...elements, newElement]);
    }
    
    const [selection, setSelection] = useState([]);
    const layerRef = useRef(null);

    return (
        <>
            <CanvasToolribbon selection={selection} layer={layerRef} setSelection={setSelection} />
            <section className="canvas-wrapper">
                <CanvasToolbar addElement={addElement} />
                <div ref={containerRef} className="canvas-stage-container">
                    <Stage className="canvas-stage" width={stageSize.width} height={stageSize.height} scaleX={stageSize.scale} scaleY={stageSize.scale}>
                        <Layer ref={layerRef}>
                            {elements.map((element) => createComponent(element, selection, setSelection
                            ))}
                        </Layer>
                    </Stage>
                </div>
            </section>
        </>
    )
};

export default CircuitCanvas;