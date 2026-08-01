import { NODE_TYPES } from "./nodeTypes";

export function createNode(type, position){
    
    for (const [key, value] of Object.entries(NODE_TYPES)){
        if(key === type){
            const newNode = {
                type: key,
                id: crypto.randomUUID(),
                node: {...value },
                position: position
            }

            return newNode;
        }
    }
}

export function updateNode(node){

    const newNode = {
        type: node.type,
        id: node.id,
        node: { ...node.node},
        position: { x: node.x, y: node.y }
    }
    
    return newNode;
}

export function updateOutputNodePower(node, output){

    const newNode = {
        type: node.type,
        id: node.id,
        node: { outputs: { out: output } },
        position: node.position
    }

    return newNode;
}

export function updateInputNodePower(node, input){

    const newNode = {
        type: node.type,
        id: node.id,
        node: { inputs: input, outputs: { out: evalOutput(node.type, input) } },
        position: node.position
    }

    return newNode;
}

function evalOutput(type, inputs){

    switch(type){
        case "AND":
            if(inputs.in1 === 1 && inputs.in2 === 1){
                return 1;
            }
            else {
                return 0;
            }
        case "OR":
            if(inputs.in1 === 1 || inputs.in2 === 1){
                return 1;
            }
            else {
                return 0;
            }
        case "NOT":
            if(inputs.in1 === 0){
                return 1;
            }
            else {
                return 0;
            }
        case "NAND":
            if(inputs.in1 === 1 && inputs.in2 === 1){
                return 0;
            }
            else {
                return 1;
            }
        case "NOR":
            if(inputs.in1 === 1 || inputs.in2 === 1){
                return 0;
            }
            else {
                return 1;
            }
        case "XOR":
            if(inputs.in1 !== inputs.in2){
                return 1;
            }
            else {
                return 0;
            }
        case "XNOR":
            if(inputs.in1 === inputs.in2){
                return 1;
            }
            else {
                return 0;
            }
    }
}