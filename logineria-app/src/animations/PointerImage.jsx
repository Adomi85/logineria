import { useEffect, useState, useRef } from "react";
import { pointerVisibility } from "./animations.js";

const PointerImage = ({image, className, alt, state}) => {
    const [visibility, setVisibility] = useState(false);
    const objRef = useRef(null);

    useEffect(() => {
        if(state.mode === alt && !visibility){
            pointerVisibility(objRef, visibility, setVisibility);
        }
        
        if(state.mode !== alt && visibility){
            pointerVisibility(objRef, visibility, setVisibility);
        }

    }, [state.mode, alt, visibility]);

    return (
        <>
            <div className={className} ref={objRef}>
                <img src={image} alt={alt} className="pointer-icon"/>
            </div>
        </>
    )
}

export default PointerImage;