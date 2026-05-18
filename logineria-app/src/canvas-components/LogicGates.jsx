import { Image, Group, Circle } from "react-konva";
import { useState } from  "react";

import useImage from "use-image";
import andImage from "../assets/AND.png";
import orImage from "../assets/OR.png";
import notImage from "../assets/NOT.png";
import nandImage from "../assets/NAND.png";
import norImage from "../assets/NOR.png";
import xorImage from "../assets/XOR.png";
import xnorImage from "../assets/XNOR.png";

export const AndGate = (props) => {
    const [image] = useImage(andImage);
    const [position, setPosition] = useState({x: 0, y:0});

    return (
        <>
            <Group {...props} x={position.x} y={position.y} draggable onDragEnd={(e) => setPosition({x: e.target.x(), y: e.target.y()})}>
                <Image image={image} width={100} height={50} x={0} y={0} />
                <Circle radius={5} x={2.5} y={12.5} fill="red"/>
                <Circle radius={5} x={2.5} y={35.5} fill="red"/>
                <Circle radius={5} x={97.5} y={25} fill="red"/>
            </Group>
        </>
    )
}

export const OrGate = (props) => {
    const [image] = useImage(orImage);
    const [position, setPosition] = useState({x: 0, y:0});

    return (
        <>
            <Group {...props} x={position.x} y={position.y} draggable onDragEnd={(e) => setPosition({x: e.target.x(), y: e.target.y()})}>
                <Image image={image} width={100} height={50} x={0} y={0} />
                <Circle radius={5} x={2.5} y={12.5} fill="red"/>
                <Circle radius={5} x={2.5} y={35.5} fill="red"/>
                <Circle radius={5} x={97.5} y={25} fill="red"/>
            </Group>
        </>
    )
}

export const NotGate = (props) => {
    const [image] = useImage(notImage);
    const [position, setPosition] = useState({x: 0, y:0});

    return (
        <>
            <Group {...props} x={position.x} y={position.y} draggable onDragEnd={(e) => setPosition({x: e.target.x(), y: e.target.y()})}>
                <Image image={image} width={100} height={50} x={0} y={0} />
                <Circle radius={5} x={2,5} y={25} fill="red"/>
                <Circle radius={5} x={97.5} y={25} fill="red"/>
            </Group>
        </>
    )
}

export const NandGate = (props) => {
    const [image] = useImage(nandImage);
    const [position, setPosition] = useState({x: 0, y:0});

    return (
        <>
            <Group {...props} x={position.x} y={position.y} draggable onDragEnd={(e) => setPosition({x: e.target.x(), y: e.target.y()})}>
                <Image image={image} width={100} height={50} x={0} y={0} />
                <Circle radius={5} x={2.5} y={12.5} fill="red"/>
                <Circle radius={5} x={2.5} y={35.5} fill="red"/>
                <Circle radius={5} x={97.5} y={25} fill="red"/>
            </Group>
        </>
    )
}

export const NorGate = (props) => {
    const [image] = useImage(norImage);
    const [position, setPosition] = useState({x: 0, y:0});

    return (
        <>
            <Group {...props} x={position.x} y={position.y} draggable onDragEnd={(e) => setPosition({x: e.target.x(), y: e.target.y()})}>
                <Image image={image} width={100} height={50} x={0} y={0} />
                <Circle radius={5} x={2.5} y={12.5} fill="red"/>
                <Circle radius={5} x={2.5} y={35.5} fill="red"/>
                <Circle radius={5} x={97.5} y={25} fill="red"/>
            </Group>
        </>
    )
}

export const XorGate = (props) => {
    const [image] = useImage(xorImage);
    const [position, setPosition] = useState({x: 0, y:0});

    return (
        <>
            <Group {...props} x={position.x} y={position.y} draggable onDragEnd={(e) => setPosition({x: e.target.x(), y: e.target.y()})}>
                <Image image={image} width={100} height={50} x={0} y={0} />
                <Circle radius={5} x={2.5} y={12.5} fill="red"/>
                <Circle radius={5} x={2.5} y={35.5} fill="red"/>
                <Circle radius={5} x={97.5} y={25} fill="red"/>
            </Group>
        </>
    )
}

export const XnorGate = (props) => {
    const [image] = useImage(xnorImage);
    const [position, setPosition] = useState({x: 0, y:0});

    return (
        <>
            <Group {...props} x={position.x} y={position.y} draggable onDragEnd={(e) => setPosition({x: e.target.x(), y: e.target.y()})}>
                <Image image={image} width={100} height={50} x={0} y={0} />
                <Circle radius={5} x={2.5} y={12.5} fill="red"/>
                <Circle radius={5} x={2.5} y={35.5} fill="red"/>
                <Circle radius={5} x={97.5} y={25} fill="red"/>
            </Group>
        </>
    )
}