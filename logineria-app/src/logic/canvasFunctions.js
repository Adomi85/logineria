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
        if(wire.startNodeId === e.target.getAttrs().id && wire.endNodeId !== e.target.getAttrs().id){
            const startPosition= e.target.getChildren().find((child) => child.attrs.id === wire.startPort).getAbsolutePosition();
            let midpointX = startPosition.x + 20;

            if(wire.startPortFace === "left"){
                midpointX = startPosition.x - 20;
            }

            const updatedWire = {
                ...wire,
                start: startPosition,
                midpoints: [midpointX, startPosition.y, wire.midpoints[2], wire.midpoints[3]]
            };

            updatedWires.push(updatedWire);
        }

        if(wire.endNodeId === e.target.getAttrs().id && wire.startNodeId !== e.target.getAttrs().id){
            const endPosition= e.target.getChildren().find((child) => child.attrs.id === wire.endPort).getAbsolutePosition();
            let midpointX = endPosition.x + 20;

            if(wire.endPortFace === "left"){
                midpointX = endPosition.x - 20;
            }

            const updatedWire = {
                ...wire,
                end: endPosition,
                midpoints: [wire.midpoints[0], wire.midpoints[1], midpointX, endPosition.y]
            };

            updatedWires.push(updatedWire);
        }

        if(wire.startNodeId === e.target.getAttrs().id && wire.endNodeId === e.target.getAttrs().id){
            const startPosition= e.target.getChildren().find((child) => child.attrs.id === wire.startPort).getAbsolutePosition();
            const endPosition= e.target.getChildren().find((child) => child.attrs.id === wire.endPort).getAbsolutePosition();
            let midpointYStart = startPosition.y + 50;
            let midpointYEnd = endPosition.y + 50;

            const updatedWire = {
                ...wire,
                start: startPosition,
                end: endPosition,
                midpoints: [startPosition.x, midpointYStart, endPosition.x, midpointYEnd]
            };

            updatedWires.push(updatedWire);
        }
    });

   state.setWires([...state.wires.filter((wire) => !updatedWires.find((updated) => updated.wireId === wire.wireId)), ...updatedWires]);
}

export function addWire(e, state){
    const type = e.target.getAttrs().type;
        
    if(type === "gate_port"){
        
        if(state.wireStart === null){

            let midpointX = e.target.getAbsolutePosition().x + 20;

            if(e.target.getAttrs().portface === "left"){
                midpointX = e.target.getAbsolutePosition().x - 20;
            }

            const startWire = {
                wireId: crypto.randomUUID(),
                type: "WIRE",
                start: e.target.getAbsolutePosition(),
                startNodeId: e.target.parent.getAttrs().id,
                startPort: e.target.getAttrs().id,
                startPortFace: e.target.getAttrs().portface,
                midpointX: midpointX
            };

            state.setWireStart(startWire);
        } else if(state.wireStart !== null && state.wireStart.startNodeId !== e.target.parent.getAttrs().id){

            let midpointX = e.target.getAbsolutePosition().x + 20;

            if(e.target.getAttrs().portface === "left"){
                midpointX = e.target.getAbsolutePosition().x - 20;
            }

            const wholeWire = {
                wireId: state.wireStart.wireId,
                type: "WIRE",
                start: state.wireStart.start,
                startNodeId: state.wireStart.startNodeId,
                startPort: state.wireStart.startPort,
                startPortFace: state.wireStart.startPortFace,
                end: e.target.getAbsolutePosition(),
                endNodeId: e.target.parent.getAttrs().id,
                endPort: e.target.getAttrs().id,
                endPortFace: e.target.getAttrs().portface,
                midpoints: [state.wireStart.midpointX, state.wireStart.start.y, midpointX, e.target.getAbsolutePosition().y]
            };

            state.setWires([...state.wires, wholeWire]);
            state.setWireStart(null);
        } else if(state.wireStart !== null && state.wireStart.startNodeId === e.target.parent.getAttrs().id){ 
            
            let midpointXStart = state.wireStart.start.x;
            let midpointXEnd = e.target.getAbsolutePosition().x;
            let midpointYStart = state.wireStart.start.y - 50;
            let midpointYEnd = state.wireStart.start.y - 50;

            if(state.wireStart.startPort === "in2" || e.target.getAttrs().id === "in2"){
                midpointYStart = state.wireStart.start.y + 50;
                midpointYEnd = state.wireStart.start.y + 50;
            }

            const wholeWire = {
                wireId: state.wireStart.wireId,
                type: "WIRE",
                start: state.wireStart.start,
                startNodeId: state.wireStart.startNodeId,
                startPort: state.wireStart.startPort,
                startPortFace: state.wireStart.startPortFace,
                end: e.target.getAbsolutePosition(),
                endNodeId: e.target.parent.getAttrs().id,
                endPort: e.target.getAttrs().id,
                endPortFace: e.target.getAttrs().portface,
                midpoints: [midpointXStart, midpointYStart, midpointXEnd, midpointYEnd]
            };

            state.setWires([...state.wires, wholeWire]);
            state.setWireStart(null);
        }
    }
}

export function deleteSelected(state){
    const filteredWires = state.wires.filter((wire) => !state.selection.find((selected) => selected.wireId === wire.wireId));
    const filteredNodes = state.nodes.filter((node) => !state.selection.find((selected) => selected.id === node.id));
        
    state.setWires(filteredWires);
    state.setNodes(filteredNodes);

    state.setSelection([]);
}

export function exportCanvas(state){
    const wires = { wires: state.wires };
    const nodes = { nodes: state.nodes };
    const data = { ...wires, ...nodes };

    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    const filename = `digital_circuit_${day}-${month}-${year}.json`;


    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
}

export function clearCanvas(state){
    state.setNodes([]);
    state.setWires([]);
    state.setWireStart(null);
    state.setSelection([]);
    state.setMode('idle');
}

export function importCanvas(state){

    const reader = new FileReader();
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";

    fileInput.click();

    fileInput.addEventListener("change", () => {
        const selectedFile = fileInput.files[0];

        if(selectedFile){
            reader.readAsText(selectedFile);
    
            reader.addEventListener("loadend", () => {
                const data = reader.result;
                const jsonData = JSON.parse(data);

                state.setNodes(jsonData.nodes);
                state.setWires(jsonData.wires);
            });
        }
    });

}

export function clearCanvasQuery(state){
            
    if(state.nodes.length !== 0){
        const dialog = document.getElementById("custom-confirm-dialog");
        const confirmBtnYes = document.getElementById("confirm-btn-yes");
        const confirmBtnNo = document.getElementById("confirm-btn-no");
    
        dialog.showModal();
    
        confirmBtnYes.addEventListener("click", (e) => {
            e.preventDefault();
            dialog.close();
            clearCanvas(state);
        });
    
        confirmBtnNo.addEventListener("click", (e) => {
            e.preventDefault();
            dialog.close();
        });
    } else {
        clearCanvas(state);
    }
}