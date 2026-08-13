import { Group, Circle, Rect, Text } from "react-konva";
import { useState, useRef, useEffect } from  "react";

import { changeWireMode } from "../animations/animations.js";
import { updateNodePosition, selectObj, updateWirePosition } from "../logic/canvasFunctions.js";
import { outputValueChanges, updateOutputFromWire } from "../logic/simLogic.js";

const OutputComponent = ({node, state}) => {
    const [position] = useState(node.position);
    const [stateValue, setStateValue] = useState(0);
    const [output, setOutput] = useState(0);
    const groupRef = useRef(null);

    useEffect(() => {

        const updateOutputValue = () => {
            
            const newOutput = outputValueChanges(node, state);
            if(newOutput !== output){
                setOutput(newOutput);
                setStateValue(newOutput);
                updateOutputFromWire(node, state);
            }
     
        }

        updateOutputValue();
        changeWireMode(state, groupRef);

    }, [node, state, output]);
   
    if(stateValue === 1){

        return (
            <>
                <Group type={node.type} {...node} x={position.x} y={position.y} ref={groupRef} draggable onDragMove={(e) => updateWirePosition(e, state)} onDragEnd={(e) => updateNodePosition(e, state)}>
                    <Rect width={50} height={50} fill="lightyellow" stroke="black" strokeWidth={2} onClick={(e) => selectObj(e, state)} name="visual-rect"/>
                    <Text text="OUTPUT" fontSize={11} x={5} y={-15} />
                    <Text text={stateValue} fontSize={25} x={18} y={15} />
                    <Circle radius={4} fill="transparent" x={-2} y={25} id={"out"} name={"wire_port"} />
                </Group>
            </>
        )
        
    } else {
        
        return (
            <>
                <Group type={node.type} {...node} x={position.x} y={position.y} ref={groupRef} draggable onDragMove={(e) => updateWirePosition(e, state)} onDragEnd={(e) => updateNodePosition(e, state)}>
                    <Rect width={50} height={50} fill="white" stroke="black" strokeWidth={2} onClick={(e) => selectObj(e, state)} name="visual-rect"/>
                    <Text text="OUTPUT" fontSize={11} x={5} y={-15} />
                    <Text text={stateValue} fontSize={25} x={18} y={15} />
                    <Circle radius={4} fill="transparent" x={-2} y={25} id={"out"} name={"wire_port"} />
                </Group>
            </>
        )
    }
}

export default OutputComponent;