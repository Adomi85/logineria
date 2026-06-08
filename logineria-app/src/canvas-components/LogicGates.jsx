import { Image, Group, Circle } from "react-konva";
import { useState } from  "react";

import { updateNodePosition, selectObj, updateWirePosition } from "../logic/canvasFunctions.js";

import useImage from "use-image";
import andImage from "../assets/AND.png";
import orImage from "../assets/OR.png";
import notImage from "../assets/NOT.png";
import nandImage from "../assets/NAND.png";
import norImage from "../assets/NOR.png";
import xorImage from "../assets/XOR.png";
import xnorImage from "../assets/XNOR.png";


export const AndGate = ({node, state}) => {
    const [image] = useImage(andImage);
    const [position] = useState(node.position);
        
    return (
        <>
            <Group type={node.type} {...node} x={position.x} y={position.y} draggable onDragMove={(e) => updateWirePosition(e, state)} onDragEnd={(e) => updateNodePosition(e, state)} >
                <Image image={image} width={100} height={50} x={0} y={0} onClick={(e) => selectObj(e, state)}/>
                <Circle radius={3} x={2.5} y={12.5} fill="blue" id={"in1"}  />
                <Circle radius={3} x={2.5} y={35.5} fill="green" id={"in2"}  />
                <Circle radius={3} x={97.5} y={25} fill="red" id={"out"}  />
            </Group>
        </>
    )
}

export const OrGate = ({node, state}) => {
    const [image] = useImage(orImage);
    const [position] = useState(node.position);

    return (
        <>
            <Group type={node.type} {...node} x={position.x} y={position.y} draggable onDragMove={(e) => updateWirePosition(e, state)} onDragEnd={(e) => updateNodePosition(e, state)}>
                <Image image={image} width={100} height={50} x={0} y={0} onClick={(e) => selectObj(e, state)}/>
                <Circle radius={3} x={2.5} y={12.5} fill="blue" id={"in1"}  />
                <Circle radius={3} x={2.5} y={35.5} fill="green" id={"in2"}  />
                <Circle radius={3} x={97.5} y={25} fill="red" id={"out"}  />
            </Group>
        </>
    )
}

export const NotGate = ({node, state}) => {
    const [image] = useImage(notImage);
    const [position] = useState(node.position);

    return (
        <>
            <Group type={node.type} {...node} x={position.x} y={position.y} draggable onDragMove={(e) => updateWirePosition(e, state)} onDragEnd={(e) => updateNodePosition(e, state)}>
                <Image image={image} width={100} height={50} x={0} y={0} onClick={(e) => selectObj(e, state)}/>
                <Circle radius={3} x={2.5} y={25} fill="blue" id={"in1"}  />
                <Circle radius={3} x={97.5} y={25} fill="red" id={"out"}  />
            </Group>
        </>
    )
}

export const NandGate = ({node, state}) => {
    const [image] = useImage(nandImage);
    const [position] = useState(node.position);

    return (
        <>
            <Group type={node.type} {...node} x={position.x} y={position.y} draggable onDragMove={(e) => updateWirePosition(e, state)} onDragEnd={(e) => updateNodePosition(e, state)}>
                <Image image={image} width={100} height={50} x={0} y={0} onClick={(e) => selectObj(e, state)}/>
                <Circle radius={3} x={2.5} y={12.5} fill="blue" id={"in1"}  />
                <Circle radius={3} x={2.5} y={35.5} fill="green" id={"in2"}  />
                <Circle radius={3} x={97.5} y={25} fill="red" id={"out"}  />
            </Group>
        </>
    )
}

export const NorGate = ({node, state}) => {
    const [image] = useImage(norImage);
    const [position] = useState(node.position);

    return (
        <>
            <Group type={node.type} {...node} x={position.x} y={position.y} draggable onDragMove={(e) => updateWirePosition(e, state)} onDragEnd={(e) => updateNodePosition(e, state)}>
                <Image image={image} width={100} height={50} x={0} y={0} onClick={(e) => selectObj(e, state)}/>
                <Circle radius={3} x={2.5} y={12.5} fill="blue" id={"in1"}  />
                <Circle radius={3} x={2.5} y={35.5} fill="green" id={"in2"}  />
                <Circle radius={3} x={97.5} y={25} fill="red" id={"out"}  />
            </Group>
        </>
    )
}

export const XorGate = ({node, state}) => {
    const [image] = useImage(xorImage);
    const [position] = useState(node.position);

    return (
        <>
            <Group type={node.type} {...node} x={position.x} y={position.y} draggable onDragMove={(e) => updateWirePosition(e, state)} onDragEnd={(e) => updateNodePosition(e, state)}>
                <Image image={image} width={100} height={50} x={0} y={0} onClick={(e) => selectObj(e, state)}/>
                <Circle radius={3} x={2.5} y={12.5} fill="blue" id={"in1"}  />
                <Circle radius={3} x={2.5} y={35.5} fill="green" id={"in2"}  />
                <Circle radius={3} x={97.5} y={25} fill="red" id={"out"}  />
            </Group>
        </>
    )
}

export const XnorGate = ({node, state}) => {
    const [image] = useImage(xnorImage);
    const [position] = useState(node.position);

    return (
        <>
            <Group type={node.type} {...node} x={position.x} y={position.y} draggable onDragMove={(e) => updateWirePosition(e, state)} onDragEnd={(e) => updateNodePosition(e, state)}>
                <Image image={image} width={100} height={50} x={0} y={0} onClick={(e) => selectObj(e, state)}/>
                <Circle radius={3} x={2.5} y={12.5} fill="blue" id={"in1"}  />
                <Circle radius={3} x={2.5} y={35.5} fill="green" id={"in2"}  />
                <Circle radius={3} x={97.5} y={25} fill="red" id={"out"}  />
            </Group>
        </>
    )
}