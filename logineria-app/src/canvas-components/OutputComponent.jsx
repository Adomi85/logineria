import { Group, Circle, Rect, Text } from "react-konva";
import { useState, useRef, useEffect } from  "react";

import { changeWireMode } from "../animations/animations.js";
import { updateNodePosition, selectObj, updateWirePosition } from "../logic/canvasFunctions.js";


const OutputComponent = ({node, state}) => {
    const [position] = useState(node.position);
    const [output, setOutput] = useState(0);
    const groupRef = useRef(null);
    
    useEffect(() => {
        
        const updateOutputValue = () => {
            if(node.node.outputs.out !== output){
                setOutput(node.node.outputs.out);           
            }
        };
        
        updateOutputValue();
        changeWireMode(state, groupRef);

    }, [state, node, output]);
   
    if(output === 1){

        return (
            <>
                <Group type={node.type} {...node} x={position.x} y={position.y} ref={groupRef} draggable onDragMove={(e) => updateWirePosition(e, state)} onDragEnd={(e) => updateNodePosition(e, state)}>
                    <Rect width={50} height={50} fill="lightyellow" stroke="black" strokeWidth={2} onClick={(e) => selectObj(e, state)} name="visual-rect"/>
                    <Text text="OUTPUT" fontSize={11} x={5} y={-15} />
                    <Text text={output} fontSize={25} x={18} y={15} />
                    <Circle radius={4} fill="transparent" x={-2} y={25} id={"out"} type={"gate_port"} name={"port"} portface={"left"}/>
                </Group>
            </>
        )
        
    } else {
        
        return (
            <>
                <Group type={node.type} {...node} x={position.x} y={position.y} ref={groupRef} draggable onDragMove={(e) => updateWirePosition(e, state)} onDragEnd={(e) => updateNodePosition(e, state)}>
                    <Rect width={50} height={50} fill="white" stroke="black" strokeWidth={2} onClick={(e) => selectObj(e, state)} name="visual-rect"/>
                    <Text text="OUTPUT" fontSize={11} x={5} y={-15} />
                    <Text text={output} fontSize={25} x={18} y={15} />
                    <Circle radius={4} fill="transparent" x={-2} y={25} id={"out"} type={"gate_port"} name={"port"} portface={"left"}/>
                </Group>
            </>
        )
    }
}

export default OutputComponent;