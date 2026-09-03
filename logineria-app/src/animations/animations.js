
export const changeImage = (e, set, state) => {
    if(state.mode === "idle" && e.target.image() !== set.image){
        e.target.image(set.image);
    }
    else {
        e.target.image(set.selectedImage);
    }
}

export const changeWireMode = (state, ref) => {
    if(state.mode === "WIRE"){
        ref.current.getChildren().forEach((child) => {
            
            if(child.attrs.name === "port"){
                child.fill("white");
                child.stroke("black");
                child.strokeWidth(1);
            }
        });
    }

    if(state.mode !== "WIRE"){
        ref.current.getChildren().forEach((child) => {
            
            if(child.attrs.name === "port"){
                child.fill("transparent");
                child.stroke("transparent");
                child.strokeWidth(0);
            }
        });
    }
}

export const hideQuickStartGuide = () => {
    const quickStartGuide = document.getElementById("quick-start-guide");
    quickStartGuide.style.display = quickStartGuide.style.display === "block" ? "none" : "block";
}