import { createNode, updateNode } from "../logic/nodeRepository.js";

export function selectObj (e, state){

    const obj = e.target.getParent().attrs;

    if(state.mode === "idle"){
        
        if(!state.selection.includes(obj) && obj.type === "WIRE"){
            state.setSelection([...state.selection, obj]);
            const visualWire = e.target.getParent().getChildren().find((child) => child.attrs.name === "visual-wire");
            visualWire.stroke("blue");
        }
        else if(state.selection.includes(obj) && obj.type === "WIRE"){
            state.setSelection(state.selection.filter((selected) => selected.id !== obj.id));
            const visualWire = e.target.getParent().getChildren().find((child) => child.attrs.name === "visual-wire");
            visualWire.stroke("black");
        }
        else if(state.selection.includes(obj) && obj.type === "INPUT" || state.selection.includes(obj) && obj.type === "OUTPUT"){
            state.setSelection(state.selection.filter((selected) => selected.id !== obj.id));
            const visualRect = e.target.getParent().getChildren().find((child) => child.attrs.name === "visual-rect");
            visualRect.stroke("black");
        }
        else if(!state.selection.includes(obj) && obj.type === "INPUT" || !state.selection.includes(obj) && obj.type === "OUTPUT"){
            state.setSelection([...state.selection, obj]);
            const visualRect = e.target.getParent().getChildren().find((child) => child.attrs.name === "visual-rect");
            visualRect.stroke("blue");
        }
        else if (state.selection.includes(obj)){
            state.setSelection(state.selection.filter((selected) => selected.id !== obj.id));
        }
        else if(!state.selection.includes(obj)){
            state.setSelection([...state.selection, obj]);
        }
    }
}

export function addNode(e, state){
    if(state.mode !== 'idle' && state.mode !== 'WIRE'){
        const position = e.target.getPointerPosition();
        const newPosition = { x: position.x - 30, y: position.y - 20 };
        const newNode = createNode(state.mode, newPosition);

        state.setNodes([...state.nodes, newNode]);
        state.setMode('idle');
    }
}

export function updateNodePosition(e, state){
    
    const data = e.target.attrs;
    const updatedNode = updateNode(data);
    
    const nodeList = state.nodes.filter((i) => i.id !== e.target.attrs.id);
    state.setNodes([...nodeList, updatedNode]);

    if(state.wires.length > 0){
        updateWirePosition(e, state);
    }

}

export function updateWirePosition(e, state){

    const updatedWires = [];

    state.wires.forEach((wire) => {
        if(wire.startNodeId === e.target.attrs.id){
            
            const startPosition= e.target.getChildren().find((child) => child.attrs.id === wire.startPort).getAbsolutePosition();
            const updatedWire = {
                ...wire,
                start: startPosition
            }

            updatedWires.push(updatedWire);
        }

        if(wire.endNodeId === e.target.attrs.id){
            
            const endPosition= e.target.getChildren().find((child) => child.attrs.id === wire.endPort).getAbsolutePosition();
            const updatedWire = {
                ...wire,
                end: endPosition
            }

            updatedWires.push(updatedWire);
        }
   });

   state.setWires([...state.wires.filter((wire) => !updatedWires.find((updated) => updated.wireId === wire.wireId)), ...updatedWires]);

}

export function addWire(e, state){
    
    if(state.wireStart === null && (e.target.attrs.id === "in1" || e.target.attrs.id === "in2" || e.target.attrs.id === "out")){
        const objID = e.target.parent.getAttr("id");
        const positionStart = e.target.getAbsolutePosition();
                
        const startWirePosition = {
            nodeId: objID,
            start: positionStart,
            port: e.target.getAttr("id")
        }

        state.setWireStart(startWirePosition);
    }
    else if(state.wireStart !== null && (e.target.attrs.id === "in1" || e.target.attrs.id === "in2" || e.target.attrs.id === "out")){
        const objID = e.target.parent.getAttr("id");
        const positionEnd = e.target.getAbsolutePosition();

        const newWire = {
            wireId: crypto.randomUUID(),
            startNodeId: state.wireStart.nodeId,
            start: state.wireStart.start,
            startPort: state.wireStart.port,
            endNodeId: objID,
            end: positionEnd,
            endPort: e.target.getAttr("id"),
            value: 0
        }

        state.setWires([...state.wires, newWire]);
        state.setWireStart(null);
        state.setMode('idle');
    }
    else {
        state.setMode('idle');
    }
}

export function removeObj(state){   
    const newWire = state.wires.filter((wire) => !state.selection.some((selected) => selected.id === wire.startNodeId || selected.id === wire.endNodeId));
    const newNodes = state.nodes.filter((node) => !state.selection.some((selected) => selected.id === node.id));

    state.setWires(newWire);
    state.setNodes(newNodes);

    state.setSelection([]);
}

export const handleCircleHover = (e, state) => {
    if(state.mode === "WIRE"){
                    
        if(e.type === "mouseenter"){
            e.target.fill("white");
            e.target.stroke("blue");
            e.target.strokeWidth(2);
        }
                    
        if(e.type === "mouseleave"){
            e.target.fill("transparent");
            e.target.stroke("transparent");
            e.target.strokeWidth(0);
        }
   }        
}

export const changeImage = (e, set, state) => {
    if(state.mode === "idle" && e.target.image() !== set.image){
        e.target.image(set.image);
    }
    else {
        e.target.image(set.selectedImage);
    }
}

export const handleCircleClick = (e, state) => {
    if(state.mode === "WIRE"){
        e.target.fill("transparent");
        e.target.stroke("transparent");
        e.target.strokeWidth(0);
    }   
}