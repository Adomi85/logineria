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
    const type = e.target.getAttr("type");

    if(type !== "Stage"){

        const position = e.target.getAbsolutePosition();
        const targetNodeId = e.target.parent.getAttr("id");
        
        if(state.wireStart === null && (e.target.attrs.id === "in1" || e.target.attrs.id === "in2" || e.target.attrs.id === "out")){
            const objID = e.target.parent.getAttr("id");
                    
            const startWirePosition = {
                nodeId: objID,
                start: position,
                port: e.target.getAttr("id")
            }
    
            state.setWireStart(startWirePosition);
        }
        else if(state.wireStart !== null && state.wireStart.nodeId !== targetNodeId && state.wireStart.position !== position && (e.target.attrs.id === "in1" || e.target.attrs.id === "in2" || e.target.attrs.id === "out")){
            const objID = e.target.parent.getAttr("id");
            
            const newWire = {
                wireId: crypto.randomUUID(),
                startNodeId: state.wireStart.nodeId,
                start: state.wireStart.start,
                startPort: state.wireStart.port,
                endNodeId: objID,
                end: position,
                endPort: e.target.getAttr("id"),
                value: 0
            }
    
            state.setWires([...state.wires, newWire]);
            state.setWireStart(null);
            state.setMode('idle');
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