import { AndGate, OrGate, NotGate, NandGate, NorGate, XnorGate, XorGate, InputNode, OutputNode } from "./LogicGates.jsx";
import { Line, Group } from "react-konva";
import { selectObj } from "../logic/canvasFunctions.js";

export const LogicComponent = ({node, state}) =>{

    if(node.type === "INPUT"){
        return (
            <InputNode key={node.id} node={node} state={state} />
        )
    }

    if(node.type === "OUTPUT"){
        return (
            <OutputNode key={node.id} node={node} state={state} />
        )
    }
    
    if(node.type === "AND"){

        return (
            <AndGate key={node.id} node={node} state={state} />          
        )
    }
    
    if(node.type === "OR"){
        return (
            <OrGate key={node.id} node={node} state={state} />
        )
    }

    if(node.type == "NOT"){
        return (
            <NotGate key={node.id} node={node} state={state} />
        )
    }

    if(node.type == "NAND"){
        return (
            <NandGate key={node.id} node={node} state={state} />
        )
    }

    if(node.type == "NOR"){
        return (
            <NorGate key={node.id} node={node} state={state} />
        )
    }

    if(node.type == "XOR"){
        return (
            <XorGate key={node.id} node={node} state={state} />
        )
    }

    if(node.type == "XNOR"){
        return (
            <XnorGate key={node.id} node={node} state={state} />
        )
    }

}

export const WireComponent = ({wire, state}) => {
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

