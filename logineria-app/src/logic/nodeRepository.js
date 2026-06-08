import { NODE_TYPES } from "./nodeTypes";

export function createNode(type, position){
    
    for (const [key, value] of Object.entries(NODE_TYPES)){
        if(key === type){
            const newNode = {
                type: key,
                id: crypto.randomUUID(),
                node: value,
                position: position
            }

            return newNode;
        }
    }
}

export function updateNode(type, position, id){

    for (const [key, value] of Object.entries(NODE_TYPES)){
        if(key === type){
            const updatedNode = {
                type: key,
                id: id,
                node: value,
                position: position
            }
            
            return updatedNode;
        }
    }
}