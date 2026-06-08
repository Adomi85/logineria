import { createNode } from "../logic/nodeRepository.js";

export function selectObj (e, state){

    const obj = e.target.parent.attrs;
    
    if(state.mode === 'idle'){
        state.setSelection([...state.selection, obj]);
        e.target.stroke("blue")
        e.target.strokeWidth(2);
    }

    if(state.mode === 'idle' && state.selection.includes(obj) && e.target.attrs.type !== "WIRE"){
        const filteredSelection = state.selection.filter(e => e !== obj);
        state.setSelection(filteredSelection);
        e.target.strokeWidth(0)
    }

    if(state.mode === 'idle' && state.selection.includes(obj) && e.target.attrs.type === "WIRE"){
        const filteredSelection = state.selection.filter(e => e !== obj);
        state.setSelection(filteredSelection);
        e.target.stroke("black");
    }

}

export function addNode(e, state){
    if(state.mode !== 'idle' && state.mode !== 'WIRE'){
        const position = e.target.getPointerPosition();
        const newPosition = { x: position.x - 50, y: position.y - 25 };
        const newNode = createNode(state.mode, newPosition);

        state.setNodes([...state.nodes, newNode]);
        state.setMode('idle');
    }
}

export function updateNodePosition(e, state){
    
    const updatedNode = {
        type: e.target.attrs.type,
        id: e.target.attrs.id,
        node: e.target.attrs.node,
        position: { x: e.target.attrs.x, y: e.target.attrs.y }
    }
    
    const nodeList = state.nodes.filter((i) => i.id !== e.target.attrs.id);
    state.setNodes([...nodeList, updatedNode]);

    updateWirePosition(e, state);

}

export function updateWirePosition(e, state){
    
    if(state.wires.find((port) => port.startNodeId === e.target.attrs.id)){
        const position = e.target.getChildren().find((child) => child.attrs.id === state.wires.find((port) => port.startNodeId === e.target.attrs.id).startPort).getAbsolutePosition();
        const updatedWire = {
            ...state.wires.find((port) => port.startNodeId === e.target.attrs.id),
            start: position
        }

        state.setWires([...state.wires.filter((wire) => wire.wireId !== updatedWire.wireId), updatedWire]);
    }

    if(state.wires.find((port) => port.endNodeId === e.target.attrs.id)){
        const position = e.target.getChildren().find((child) => child.attrs.id === state.wires.find((port) => port.endNodeId === e.target.attrs.id).endPort).getAbsolutePosition();
        const updatedWire = {
            ...state.wires.find((port) => port.endNodeId === e.target.attrs.id),
            end: position
        }
        
        state.setWires([...state.wires.filter((wire) => wire.wireId !== updatedWire.wireId), updatedWire]);
    }   
}

export function addWire(e, state){
    
    if(state.mode === 'WIRE' && state.wireStart === null){
        const objID = e.target.parent.getAttr("id");
        const positionStart = e.target.getAbsolutePosition();
        
        const startWirePosition = {
            nodeId: objID,
            start: positionStart,
            port: e.target.getAttr("id")
        }

        state.setWireStart(startWirePosition);
    }

    if(state.mode === 'WIRE' && state.wireStart !== null){
        const objID = e.target.parent.getAttr("id");
        const positionEnd = e.target.getAbsolutePosition();

        const newWire = {
            wireId: crypto.randomUUID(),
            startNodeId: state.wireStart.nodeId,
            start: state.wireStart.start,
            startPort: state.wireStart.port,
            endNodeId: objID,
            end: positionEnd,
            endPort: e.target.getAttr("id")
        }

        state.setWires([...state.wires, newWire]);
        state.setWireStart(null);
        state.setMode('idle');
    }
}

export function removeObj(state){
    
    if(state.selection.length > 0){
        const newNodes = []
        const newWires = [];
        
        state.nodes.forEach((node) => {

            if(!state.selection.find((selected) => selected.id === node.id)){
                newNodes.push(node);
            }
        })
        
        state.setNodes(newNodes);

        state.wires.forEach((wire) => {

            if(state.selection.find((selected) => selected.wireId === wire.wireId)){
                newWires.push(wire);
            }
        })

        state.setWires(newWires);
        state.setSelection([]);
    }
}