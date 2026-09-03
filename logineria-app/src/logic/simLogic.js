
import { updateInputNodePower, updateOutputNodePower } from "./nodeRepository";

export function updateInput(id, state, value){

    if(state.wires.length !== 0){

        const updatedWires = [];
        let foundWire = false;

        const wires = state.wires;

        wires.forEach((wire) => {

            if(wire.startNodeId === id && wire.startPort === "in1" || wire.endNodeId === id && wire.endPort === "in1") {
                const updatedWire = {
                    ...wire,
                    value: value
                }

                foundWire = true;
                updatedWires.push(updatedWire);
            }
        });
        
        const node = state.nodes.find((n) => n.id === id);

        const updatedNode = {
            ...node,
            node: { ...node.node, inputs: { in1: value } }
        }

        if(foundWire){
            state.setWires([...state.wires.filter((w) => !updatedWires.find((updated) => updated.wireId === w.wireId)), ...updatedWires]);
        }

        state.setNodes([...state.nodes.filter((n) => n.id !== node.id), updatedNode]);
    }
    else {
        const node = state.nodes.find((n) => n.id === id);

        const updatedNode = {
            ...node,
            node: { ...node.node, inputs: { in1: value } }
        }

        state.setNodes([...state.nodes.filter((n) => n.id !== node.id), updatedNode]);
    }
}

export async function runSimulation(state){

    let wires = state.wires;
    let nodes = state.nodes;

    let inputs = [];
    
    wires.forEach((wire) => {
        const startNode = nodes.find((node) => node.id === wire.startNodeId);
        const endNode = nodes.find((node) => node.id === wire.endNodeId);

        if(startNode.type === "INPUT"){
            const input = {
                inputId: startNode.id,
                value: startNode.node.inputs.in1,
                connectedPort: wire.endPort,
                connectedNodeId: wire.endNodeId,
                wireId: wire.wireId
            };

            const updatedWire = {
                ...wire,
                value: startNode.node.inputs.in1
            };

            wires = [...wires.filter((w) => w.wireId !== wire.wireId), updatedWire];

            inputs.push(input);
        }

        if(endNode.type === "INPUT"){
            const input = {
                inputId: endNode.id,
                value: endNode.node.inputs.in1,
                connectedPort: wire.startPort,
                connectedNodeId: wire.startNodeId,
                wireId: wire.wireId
            };

            const updatedWire = {
                ...wire,
                value: endNode.node.inputs.in1
            };

            wires = [...wires.filter((w) => w.wireId !== wire.wireId), updatedWire];

            inputs.push(input);
        }
    });

    let edges = [];

    inputs.forEach((input) => {
        const connectedNode = nodes.find((node) => node.id === input.connectedNodeId);

        if(connectedNode && connectedNode.type !== "OUTPUT"){
            const inputValues = {
                ...connectedNode.node.inputs,
                [input.connectedPort]: input.value
            }

            const updatedNode = updateInputNodePower(connectedNode, inputValues);
            nodes = [...nodes.filter((n) => n.id !== connectedNode.id), updatedNode];
            edges = [...edges.filter((e) => e.id !== connectedNode.id), updatedNode];
        }
    });

    let outputs = [];

    for(let i = 0; i < edges.length; i++){
        const edge = edges[i];

        wires.forEach((wire) => {
            if(wire.startNodeId === edge.id && wire.startPort === "out" || wire.endNodeId === edge.id && wire.endPort === "out"){
                const updatedWire = {
                    ...wire,
                    value: edge.node.outputs.out
                };

                wires = [...wires.filter((w) => w.wireId !== wire.wireId), updatedWire];

                if(wire.startNodeId === edge.id){
                    const connectedNode = nodes.find((node) => node.id === wire.endNodeId);

                    if(connectedNode && connectedNode.type === "OUTPUT"){
                        outputs = [...outputs.filter((o) => o.id !== connectedNode.id), connectedNode];
                    } 
                    else if(connectedNode && connectedNode.type !== "OUTPUT"){
                        const inputValues = {
                            ...connectedNode.node.inputs,
                            [wire.endPort]: edge.node.outputs.out
                        }

                        const updatedNode = updateInputNodePower(connectedNode, inputValues);
                        nodes = [...nodes.filter((n) => n.id !== connectedNode.id), updatedNode];
                        edges = [...edges.filter((e) => e.id !== connectedNode.id), updatedNode];
                    }
                }

                if(wire.endNodeId === edge.id){
                    const connectedNode = nodes.find((node) => node.id === wire.startNodeId);

                    if(connectedNode && connectedNode.type === "OUTPUT"){
                        outputs = [...outputs.filter((o) => o.id !== connectedNode.id), connectedNode];
                    }
                    else if(connectedNode && connectedNode.type !== "OUTPUT"){
                        const inputValues = {
                            ...connectedNode.node.inputs,
                            [wire.startPort]: edge.node.outputs.out
                        }
                        const updatedNode = updateInputNodePower(connectedNode, inputValues);
                        nodes = [...nodes.filter((n) => n.id !== connectedNode.id), updatedNode];
                        edges = [...edges.filter((e) => e.id !== connectedNode.id), updatedNode];
                    }
                }
            }
        });
    }

    outputs.forEach((output) => {
        wires.forEach((wire) => {
            if(wire.startNodeId === output.id || wire.endNodeId === output.id){
                const updatedNode = updateOutputNodePower(output, wire.value);
                nodes = [...nodes.filter((n) => n.id !== output.id), updatedNode];
            }
        });
    });
    
    state.setNodes(nodes);
    state.setWires(wires);
}

