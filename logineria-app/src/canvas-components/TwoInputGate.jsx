import { useState, useEffect, useRef } from "react";
import { Image, Group, Circle } from "react-konva";
import useImage from "use-image";

import { changeImage, changeWireMode } from "../animations/animations.js";
import { updateNodePosition, selectObj, updateWirePosition } from "../logic/canvasFunctions.js";
import { inputValueChanges, updateInputFromWire, updateOutputToWire } from "../logic/simLogic.js";


const TwoInputGate = ({node, state, componentImg, selectedImg }) => {
    const [image] = useImage(componentImg);
    const [selectedImage] = useImage(selectedImg);
    const [position] = useState(node.position);
    const [inputs, setInputs] = useState({ in1: 0, in2: 0 });
    const [output, setOutput] = useState(0);
    const groupRef = useRef(null);
    
    useEffect(() => {

        const newInputs = inputValueChanges(node, state);
                
        const inputChange = () => {
            
            if(newInputs.in1 !== inputs.in1 || newInputs.in2 !== inputs.in2){
                
                setInputs(newInputs);
                updateInputFromWire(node, newInputs, state);
            }
        }

        const outputChange = () => {

            const newOutput = node.node.outputs.out;

            if(newOutput !== output){
                setOutput(newOutput);
                updateOutputToWire(node, state, newOutput);
            }
        }

        inputChange();
        outputChange();
        changeWireMode(state, groupRef);
        
    }, [node, state, inputs, output])

    return (
        <>
            <Group type={node.type} {...node} x={position.x} y={position.y} ref={groupRef} draggable onDragMove={(e) => updateWirePosition(e, state)} onDragEnd={(e) => updateNodePosition(e, state)} >
                <Image image={image} width={60} height={40} x={0} y={0} onClick={(e) => {
                    changeImage(e,{ image, selectedImage }, state);
                    selectObj(e, state);
                    }}/>
                <Circle radius={3} x={0} y={8.5} fill="transparent" id={"in1"} name={"wire_port"} />
                <Circle radius={3} x={0} y={30.5} fill="transparent" id={"in2"} name={"wire_port"} />
                <Circle radius={3} x={58.5} y={20} fill="transparent" id={"out"} name={"wire_port"} />
            </Group>
        </>
    )
}

export default TwoInputGate;
