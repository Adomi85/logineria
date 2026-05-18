import { AndGate, OrGate, NotGate, NandGate, NorGate, XnorGate, XorGate } from "../canvas-components/LogicGates.jsx";

export function createComponent(element, setSelection){
        
    if(element.type === "AND"){
        return (
            <AndGate key={element.id} props={element} onClick={(e) => selectElement(e, setSelection)} />
        )
    }

    if(element.type === "OR"){
        return (
            <OrGate key={element.id} props={element} onClick={(e) => selectElement(e, setSelection)} />
        )
    }

    if(element.type == "NOT"){
        return (
            <NotGate key={element.id} props={element} onClick={(e) => selectElement(e, setSelection)} />
        )
    }

    if(element.type == "NAND"){
        return (
            <NandGate key={element.id} props={element} onClick={(e) => selectElement(e, setSelection)} />
        )
    }

    if(element.type == "NOR"){
        return (
            <NorGate key={element.id} props={element} onClick={(e) => selectElement(e, setSelection)} />
        )
    }

    if(element.type == "XOR"){
        return (
            <XorGate key={element.id} props={element} onClick={(e) => selectElement(e, setSelection)} />
        )
    }

    if(element.type == "XNOR"){
        return (
            <XnorGate key={element.id} props={element} onClick={(e) => selectElement(e, setSelection)} />
        )
    }
}

export function selectElement(e, setSelection){
    
    const newSelection = e.target.parent.getAttr("props");
    setSelection(newSelection);
    
    e.target.stroke("green"); // Komponentin korostus, jotta jollain tavalla varmistuu että komponentti on valittuna. Toiminnon toteutus vielä kesken.
    e.target.strokeWidth(1);
}

export function removeElement(selection, layer){
    
    const group = layer.current.getChildren();
    const node = group.find((e) => {
        const attr = e.getAttr("props");

        if(attr.id === selection.id){
            return e
        }
    });
    
    node.remove();
}