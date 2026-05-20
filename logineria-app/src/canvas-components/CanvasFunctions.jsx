import { AndGate, OrGate, NotGate, NandGate, NorGate, XnorGate, XorGate } from "../canvas-components/LogicGates.jsx";

export function createComponent(element, selection, setSelection){
        
    if(element.type === "AND"){
        return (
            <AndGate key={element.id} props={element} onClick={(e) => selectElement(e, selection, setSelection)} />
        )
    }

    if(element.type === "OR"){
        return (
            <OrGate key={element.id} props={element} onClick={(e) => selectElement(e, selection, setSelection)} />
        )
    }

    if(element.type == "NOT"){
        return (
            <NotGate key={element.id} props={element} onClick={(e) => selectElement(e, selection, setSelection)} />
        )
    }

    if(element.type == "NAND"){
        return (
            <NandGate key={element.id} props={element} onClick={(e) => selectElement(e, selection, setSelection)} />
        )
    }

    if(element.type == "NOR"){
        return (
            <NorGate key={element.id} props={element} onClick={(e) => selectElement(e, selection, setSelection)} />
        )
    }

    if(element.type == "XOR"){
        return (
            <XorGate key={element.id} props={element} onClick={(e) => selectElement(e, selection, setSelection)} />
        )
    }

    if(element.type == "XNOR"){
        return (
            <XnorGate key={element.id} props={element} onClick={(e) => selectElement(e, selection, setSelection)} />
        )
    }
}

export function selectElement(e, selection, setSelection){
    
    const newValue = e.target.parent.getAttr("props");
    const value = selection.find(e => e === newValue);
    
    if(value !== undefined){
        const newSelection = selection.filter((e) => e !== newValue);
        
        setSelection(newSelection);
        e.target.strokeWidth(0);
    }
    else {
        
        setSelection([...selection, newValue]);
        e.target.stroke("green");
        e.target.strokeWidth(1);
    }

}

export function removeElement(selection, layer, setSelection){
    
    if(selection.lenght !== 0){
        
        const group = layer.current.getChildren();
        const nodes = [];
        
        group.forEach((node) => {
            const value = node.getAttr("props");
            const selectionVal = selection.find((val) => val.id === value.id);

            if(value === selectionVal){
                const newSelection = selection.filter((i) => i !== selectionVal);
                nodes.push(node);
                
                setSelection(newSelection);
            }
        });

        nodes.forEach((node) => node.remove());
    }
}