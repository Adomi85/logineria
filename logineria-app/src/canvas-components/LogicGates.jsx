import { Image, Group, Circle, Rect, Text } from "react-konva";
import { useState, useRef, useEffect } from  "react";
import Konva from "konva";

import { updateNodePosition, selectObj, updateWirePosition, changeImage, changeWireMode } from "../logic/canvasFunctions.js";
import { updateInput, inputValueChanges, outputValueChanges, updateInputFromWire, updateOutputToWire, updateOutputFromWire } from "../logic/simLogic.js";

import useImage from "use-image";
import andImage from "../assets/AND.png";
import andSelectedImage from "../assets/AND_selected.png";
import orImage from "../assets/OR.png";
import orSelectedImage from "../assets/OR_selected.png";
import notImage from "../assets/NOT.png";
import notSelectedImage from "../assets/NOT_selected.png";
import nandImage from "../assets/NAND.png";
import nandSelectedImage from "../assets/NAND_selected.png";
import norImage from "../assets/NOR.png";
import norSelectedImage from "../assets/NOR_selected.png";
import xorImage from "../assets/XOR.png";
import xorSelectedImage from "../assets/XOR_selected.png";
import xnorImage from "../assets/XNOR.png";
import xnorSelectedImage from "../assets/XNOR_selected.png";


export const InputNode = ({node, state}) => {
    const [position] = useState(node.position);
    const [stateValue, setStateValue] = useState(node.node.inputs.in1);
    const rectRef = useRef(null);
    const circleRef = useRef(null);
    const groupRef = useRef(null);
    
    useEffect(() => {
        changeWireMode(state, groupRef);

    }, [state]);

    const powerButton = (e) => {
        if (circleRef.current.position().y === 15) {
            
            rectRef.current.fill("lightgray");
            circleRef.current.fill("red");

            const off = new Konva.Tween({
                node: circleRef.current,
                duration: 0.2,
                y: 35,
                easing: Konva.Easings.Linear,
            });

            off.play();
            updateInput(e, state, 0);
            setStateValue(0);
        }
        else {

            rectRef.current.fill("lightyellow");
            circleRef.current.fill("green");

            const on = new Konva.Tween({
                node: circleRef.current,
                duration: 0.2,
                y: 15,
                easing: Konva.Easings.Linear,
            });

            on.play();
            updateInput(e, state, 1);
            setStateValue(1);
        }
    }

    if(stateValue === 0){

        return (
            <>
                <Group type={node.type} {...node} x={position.x} y={position.y} ref={groupRef} draggable onDragMove={(e) => updateWirePosition(e, state)} onDragEnd={(e) => updateNodePosition(e, state)}>
                    <Rect width={50} height={50} fill="lightgray" stroke="black" strokeWidth={2} onClick={(e) => selectObj(e, state)} ref={rectRef} name="visual-rect"/>
                    <Text text="INPUT" fontSize={11} x={8} y={-15} />
                    <Text text={stateValue} fontSize={25} x={18} y={15} />
                    <Rect width={10} height={30} fill="lightgray" stroke="gray" strokeWidth={1} x={-20} y={10} cornerRadius={5} />
                    <Circle radius={5} fill="red" stroke="black" strokeWidth={1} x={-15} y={35} id={"power"} ref={circleRef} onClick={(e) => powerButton(e)} />
                    <Circle radius={4} fill="transparent" x={50} y={25} id={"in1"} name={"wire_port"} />
                </Group>
            </>
        )
    } else {
    
        return (
            <>
                <Group type={node.type} {...node} x={position.x} y={position.y} ref={groupRef} draggable onDragMove={(e) => updateWirePosition(e, state)} onDragEnd={(e) => updateNodePosition(e, state)}>
                    <Rect width={50} height={50} fill="lightyellow" stroke="black" strokeWidth={2} onClick={(e) => selectObj(e, state)} ref={rectRef} name="visual-rect"/>
                    <Text text="INPUT" fontSize={11} x={8} y={-15} />
                    <Text text={stateValue} fontSize={25} x={18} y={15} />
                    <Rect width={10} height={30} fill="lightgray" stroke="gray" strokeWidth={1} x={-20} y={10} cornerRadius={5} />
                    <Circle radius={5} fill="green" stroke="black" strokeWidth={1} x={-15} y={15} id={"power"} ref={circleRef} onClick={(e) => powerButton(e)} />
                    <Circle radius={4} fill="transparent" x={50} y={25} id={"in1"} name={"wire_port"} />
                </Group>
            </> 
        )  
    }
}



export const OutputNode = ({node, state}) => {
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
   
    return (
        <>
            <Group type={node.type} {...node} x={position.x} y={position.y} ref={groupRef} draggable onDragMove={(e) => updateWirePosition(e, state)} onDragEnd={(e) => updateNodePosition(e, state)}>
                <Rect width={50} height={50} fill="lightgray" stroke="black" strokeWidth={2} onClick={(e) => selectObj(e, state)} name="visual-rect"/>
                <Text text="OUTPUT" fontSize={11} x={5} y={-15} />
                <Text text={stateValue} fontSize={25} x={18} y={15} />
                <Circle radius={4} fill="transparent" x={-2} y={25} id={"out"} name={"wire_port"} />
            </Group>
        </>
    )
}

export const AndGate = ({node, state}) => {
    const [image] = useImage(andImage);
    const [selectedImage] = useImage(andSelectedImage);
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

export const OrGate = ({node, state}) => {
    const [image] = useImage(orImage);
    const [selectedImage] = useImage(orSelectedImage);
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
            <Group type={node.type} {...node} x={position.x} y={position.y} ref={groupRef} draggable onDragMove={(e) => updateWirePosition(e, state)} onDragEnd={(e) => updateNodePosition(e, state)}>
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

export const NotGate = ({node, state}) => {
    const [image] = useImage(notImage);
    const [position] = useState(node.position);
    const [selectedImage] = useImage(notSelectedImage);
    const [inputs, setInputs] = useState({ in1: 0 });
    const [output, setOutput] = useState(0);
    const groupRef = useRef(null);

    useEffect(() => {

        const newInputs = inputValueChanges(node, state);
        
        const inputChange = () => {
            
            if(newInputs.in1 !== inputs.in1){
                
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
            <Group type={node.type} {...node} x={position.x} y={position.y} ref={groupRef} draggable onDragMove={(e) => updateWirePosition(e, state)} onDragEnd={(e) => updateNodePosition(e, state)}>
                <Image image={image} width={60} height={40} x={0} y={0} onClick={(e) => {
                    changeImage(e,{ image, selectedImage }, state);
                    selectObj(e, state);
                    }}/>
                <Circle radius={3} x={0} y={20} fill="transparent" id={"in1"} name={"wire_port"} />
                <Circle radius={3} x={58.5} y={20} fill="transparent" id={"out"} name={"wire_port"} />
            </Group>
        </>
    )
}

export const NandGate = ({node, state}) => {
    const [image] = useImage(nandImage);
    const [selectedImage] = useImage(nandSelectedImage);
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
            <Group type={node.type} {...node} x={position.x} y={position.y} ref={groupRef} draggable onDragMove={(e) => updateWirePosition(e, state)} onDragEnd={(e) => updateNodePosition(e, state)}>
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

export const NorGate = ({node, state}) => {
    const [image] = useImage(norImage);
    const [selectedImage] = useImage(norSelectedImage);
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
            <Group type={node.type} {...node} x={position.x} y={position.y} ref={groupRef} draggable onDragMove={(e) => updateWirePosition(e, state)} onDragEnd={(e) => updateNodePosition(e, state)}>
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

export const XorGate = ({node, state}) => {
    const [image] = useImage(xorImage);
    const [position] = useState(node.position);
    const [selectedImage] = useImage(xorSelectedImage);
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
            <Group type={node.type} {...node} x={position.x} y={position.y} ref={groupRef} draggable onDragMove={(e) => updateWirePosition(e, state)} onDragEnd={(e) => updateNodePosition(e, state)}>
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

export const XnorGate = ({node, state}) => {
    const [image] = useImage(xnorImage);
    const [selectedImage] = useImage(xnorSelectedImage);
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
            <Group type={node.type} {...node} x={position.x} y={position.y} ref={groupRef} draggable onDragMove={(e) => updateWirePosition(e, state)} onDragEnd={(e) => updateNodePosition(e, state)}>
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