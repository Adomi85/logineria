import { AndGate, OrGate, NotGate, NandGate, NorGate, XnorGate, XorGate } from "./LogicGates.jsx";
import { Line } from "react-konva";
import { selectObj } from "../logic/canvasFunctions.js";

export function LogicComponent(node, state){
    
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
    
    return (
        <>
            <Line type={"WIRE"} {...wire} points={[wire.start.x, wire.start.y, wire.end.x, wire.end.y]} stroke="black" strokeWidth={2} onClick={(e) => selectObj(e, state)} />
        </>
    )
}

