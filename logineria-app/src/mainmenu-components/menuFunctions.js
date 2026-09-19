import { clearCanvas } from "../logic/canvasFunctions.js";
import html2canvas from "html2canvas";

export function importCanvas(state){

    // Import a previously saved circuit from a json file.
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

                // Imported data replaces the current circuit in full.
                state.setNodes(jsonData.nodes);
                state.setWires(jsonData.wires);
            });
        }
    });

}

export function exportCanvas(state){
    // Save nodes and wires together into json file and download it to local machine, so the circuit can be restored as a later import.
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

export function clearCanvasQuery(state){
            
    if(state.nodes.length !== 0){
        // Ask for confirmation only when clearing would remove existing nodes.
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

export function deleteSelected(state){
    const nodes = state.nodes;
    const wires = state.wires;
    
    let hasNodesSelected = false;
    let hasWiresSelected = false;

    if(state.selection.length !== 0){
        for(const selection of state.selection){
            if(selection.type === "WIRE"){
                hasWiresSelected = true;
                
            } else {
                hasNodesSelected = true;
            } 
        }
    }

    if(hasNodesSelected){
        const filteredNodes = nodes.filter((node) => !state.selection.find((selection) => selection.id === node.id));
        let finalWires = wires;

        state.selection.forEach((selection) => {
            if(selection.type !== "WIRE"){
                const filteredWires = [];
                const filterNodeConnectedWires = wires.filter((wire) => wire.startId !== selection.id && wire.endId !== selection.id);
                
                filteredWires.push(...filterNodeConnectedWires);
                const filterConnectedWires = filteredWires.filter((wire) => !wires.find((w) => wire.startId === w.id || wire.endId === w.id));
                const listWires = filterConnectedWires.filter((wire) => !state.selection.find((s) => s.id === wire.id));
                const tempWiresArray = finalWires.concat();
                
                tempWiresArray.forEach((wire) => {
                    if(!listWires.includes(wire)){
                        finalWires = finalWires.filter((w) => w.id !== wire.id);
                    }
                });
            }
        });
        
        state.setNodes(filteredNodes); // Update nodes and remove any selected nodes.
        state.setWires(finalWires); // Remove wires that are connected to the deleted nodes, as well as any selected wires.
        
        state.setSelection([]);
        
    } 
    else if(hasNodesSelected === false && hasWiresSelected === true){
        const filteredWires = wires.filter((wire) => !state.selection.find((selection) => selection.id === wire.id));
        const connectedWires = wires.filter((wire) => !filteredWires.find((w) => wire.startId === w.id || wire.endId === w.id));
        const finalWires = connectedWires.filter((wire) => !state.selection.find((selection) => selection.id === wire.id));

        state.setWires(finalWires); // Update wires only, since no nodes are selected to be deleted.
        state.setSelection([]);

    } else {
        return;
    }
}

export function resetInteractions(state){

    if(state.nodes !== null){
        const updatedNodes = [];
        const updatedWires = [];

        for(const node of state.nodes){
        
            let updatedNode = {
                ...node,
                node: { inputs: {in1: 0, in2: 0}, outputs: { out1: 0 } }
            };

            if(updatedNode.type === "INPUT"){
                updatedNode = {
                    ...node,
                    node: { inputs: {in1: 0}}
                };
            } else if(updatedNode.type === "OUTPUT"){
                updatedNode = {
                    ...node,
                    node: { outputs: { out: 0 } }
                };
            } else if(updatedNode.type === "NOT"){
                updatedNode = {
                    ...node,
                    node: { inputs: {in1: 0}, outputs: { out: 0 } }
                };
            }

            updatedNodes.push(updatedNode);
        }

        for(const wire of state.wires){
            const newWire = {
                ...wire,
                value: 0
            }
            
            updatedWires.push(newWire);
        }

        state.setNodes(updatedNodes);
        state.setWires(updatedWires);
    }
}

export const captureImage = () => {
    const captureStage = document.getElementById("canvas-stage");

    html2canvas(captureStage).then((canvas) => {
        const image = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = image;
        link.download = "circuit.png";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

export const hideQuickStartGuide = (guide) => {
    
    const quickStartGuide = document.getElementById("quick-start-guide");
    const guideContent = document.getElementById("guide-content");

    if(!guide.guideVisible){
        quickStartGuide.style.width = "500px";
        quickStartGuide.style.borderLeft = "2px solid blue";
        guideContent.style.opacity = "1";
        guideContent.style.visibility = "visible";
        guide.setGuideVisible(true);
    } else {
        quickStartGuide.style.width = "0px";
        quickStartGuide.style.border = "none";
        guideContent.style.opacity = "0";
        guideContent.style.visibility = "hidden";
        guide.setGuideVisible(false);
    }
}