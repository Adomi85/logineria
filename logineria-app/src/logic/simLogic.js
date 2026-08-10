
import { updateInputNodePower, updateOutputNodePower } from "./nodeRepository";

export function updateInput(e, state, value){

    if(state.wires.length !== 0){

        const inputId = e.target.parent.attrs.id;
        const wire = state.wires.find((w) => w.endNodeId === inputId || w.startNodeId === inputId);
        const node = state.nodes.find((n) => n.id === inputId);

        const updatedWire = {
            ...wire,
            value: value
        }

        const updatedNode = {
            ...node,
            node: { ...node.node, inputs: { in1: value } }
        }

        state.setWires([...state.wires.filter((w) => w.wireId !== wire.wireId), updatedWire]);
        state.setNodes([...state.nodes.filter((n) => n.id !== node.id), updatedNode]);
    }
    else {
        const inputId = e.target.parent.attrs.id;
        const node = state.nodes.find((n) => n.id === inputId);

        const updatedNode = {
            ...node,
            node: { ...node.node, inputs: { in1: value } }
        }

        state.setNodes([...state.nodes.filter((n) => n.id !== node.id), updatedNode]);
    }
}

export function inputValueChanges(node, state){
    
    const firstInputWire = state.wires.find((w) => w.endNodeId === node.id && w.endPort === "in1" || w.startNodeId === node.id && w.startPort === "in1");
    const secondInputWire = state.wires.find((w) => w.endNodeId === node.id && w.endPort === "in2" || w.startNodeId === node.id && w.startPort === "in2");

    if(node.type !== "NOT"){
        
        const inputs = {
            in1: firstInputWire ? firstInputWire.value : 0,
            in2: secondInputWire ? secondInputWire.value : 0
        }
    
        return inputs;
    }

    if(node.type === "NOT"){

        const inputs = {
            in1: firstInputWire ? firstInputWire.value : 0
        }

        return inputs;
    }

}

export function updateInputFromWire(node, input, state){

    const updatedNode = updateInputNodePower(node, input);
    state.setNodes([...state.nodes.filter((n) => n.id !== node.id), updatedNode]);

}

export function updateOutputToWire(node, state, output){

    const wire = state.wires.find((w) => w.startNodeId === node.id && w.startPort === "out" || w.endNodeId === node.id && w.endPort === "out");

    if(wire){
        const updatedWire = {
            ...wire,
            value: output
        }

        state.setWires([...state.wires.filter((w) => w.wireId !== wire.wireId), updatedWire]);
    }

}

export function outputValueChanges(node, state){
 
    const outputWire = state.wires.find((w) => w.startNodeId === node.id && w.startPort === "out" || w.endNodeId === node.id && w.endPort === "out");
 
    if(outputWire){
        return outputWire.value;
    }
    else {
        return 0;
    }
    
}

export function updateOutputFromWire(node, state){
    const wire = state.wires.find((w) => w.startNodeId === node.id && w.startPort === "out" || w.endNodeId === node.id && w.endPort === "out");

    if(wire){
        const output = {
            out: wire.value
        }

        const updatedNode = updateOutputNodePower(node, output);

        state.setNodes([...state.nodes.filter((n) => n.id !== node.id), updatedNode]);
    }

}