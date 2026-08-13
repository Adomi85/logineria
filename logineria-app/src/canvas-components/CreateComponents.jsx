import OutputComponent from "./OutputComponent.jsx";
import InputComponent from "./InputComponent.jsx";
import TwoInputGate from "./TwoInputGate.jsx";
import SingleInputGate from "./SingleInputGate.jsx";
import { Line, Group } from "react-konva";
import { selectObj } from "../logic/canvasFunctions.js";

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

export const LogicComponent = ({ node, state }) => {
    if (node.type === "INPUT") {
        return <InputComponent key={node.id} node={node} state={state} />;
    }

    if (node.type === "OUTPUT") {
        return <OutputComponent key={node.id} node={node} state={state} />;
    }

    if (node.type === "NOT") {
        return (
            <SingleInputGate
                key={node.id}
                node={node}
                state={state}
                componentImg={notImage}
                selectedImg={notSelectedImage}
            />
        );
    }

    if (node.type === "AND") {
        return (
            <TwoInputGate
                key={node.id}
                node={node}
                state={state}
                componentImg={andImage}
                selectedImg={andSelectedImage}
            />
        );
    }

    if (node.type === "OR") {
        return (
            <TwoInputGate
                key={node.id}
                node={node}
                state={state}
                componentImg={orImage}
                selectedImg={orSelectedImage}
            />
        );
    }

    if (node.type === "NAND") {
        return (
            <TwoInputGate
                key={node.id}
                node={node}
                state={state}
                componentImg={nandImage}
                selectedImg={nandSelectedImage}
            />
        );
    }

    if (node.type === "NOR") {
        return (
            <TwoInputGate
                key={node.id}
                node={node}
                state={state}
                componentImg={norImage}
                selectedImg={norSelectedImage}
            />
        );
    }

    if (node.type === "XOR") {
        return (
            <TwoInputGate
                key={node.id}
                node={node}
                state={state}
                componentImg={xorImage}
                selectedImg={xorSelectedImage}
            />
        );
    }

    if (node.type === "XNOR") {
        return (
            <TwoInputGate
                key={node.id}
                node={node}
                state={state}
                componentImg={xnorImage}
                selectedImg={xnorSelectedImage}
            />
        );
    }

    return null;
};

export const WireComponent = ({ wire, state }) => {
    const halfpointX = (wire.start.x + wire.end.x) / 2;
    
    return (
        <>
            <Group type={"WIRE"} key={wire.id} {...wire} >
                <Line points={[wire.start.x, wire.start.y, halfpointX, wire.start.y, halfpointX, wire.end.y, wire.end.x, wire.end.y]} name="selection-wire" lineCap="round" lineJoin="round" stroke="transparent" strokeWidth={20} onClick={(e) => selectObj(e, state)}/>
                <Line points={[wire.start.x, wire.start.y, halfpointX, wire.start.y, halfpointX, wire.end.y, wire.end.x, wire.end.y]} name="visual-wire" lineCap="round" lineJoin="round" stroke="black" strokeWidth={1}/>
            </Group>
        </>
    )
}

