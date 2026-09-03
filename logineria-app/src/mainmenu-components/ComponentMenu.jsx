import { deleteSelected } from "../logic/canvasFunctions.js";
import { useState, useEffect } from "react";

import andImage from "../assets/and.png";
import orImage from "../assets/or.png";
import notImage from "../assets/not.png";
import nandImage from "../assets/nand.png";
import norImage from "../assets/nor.png";
import xorImage from "../assets/xor.png";
import xnorImage from "../assets/xnor.png";
import inputImage from "../assets/input.png";
import outputImage from "../assets/output.png";

const ComponentMenu = ({state}) => {
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        
        const deleteDisabled = () => {
            if(state.selection.length > 0 && isDisabled){
                setIsDisabled(false);
                
            }

            if(state.selection.length === 0 && !isDisabled){
                setIsDisabled(true);
                
            }
        }

        deleteDisabled();

    }, [state.selection, isDisabled]);

    function switchMode(type, mode, setMode){
        if(mode === 'idle' || mode !== type){
            setMode(type);
        }
        else {
            setMode('idle');
        }
    }

    function componentOnClick(e, state){
        const componentType = e.currentTarget.id;

        switchMode(componentType, state.mode, state.setMode);
    }

    return (
        <>
            <div className="menu-components-menu">
                <p className="menu-components-title">Logic Components</p>
                <div className="menu-components-buttons">
                    <button
                    className="menu-button" 
                    id="WIRE" 
                    onClick={() => switchMode('WIRE', state.mode, state.setMode)}>Add Wire</button>
                    <button 
                    className="menu-button" 
                    id="DELETE" 
                    disabled={isDisabled} 
                    onClick={() => deleteSelected(state)}>Delete selected</button>
                </div>
                <div className="menu-components-container">
                    <div className="menu-components-component">
                        <img 
                        src={inputImage} 
                        alt="INPUT" 
                        id="INPUT" 
                        className="menu-components-icon" 
                        onClick={(e) => componentOnClick(e, state)}
                        />
                        <label className="menu-components-label">INPUT</label>
                    </div>
                    <div className="menu-components-component">
                        <img 
                        src={outputImage} 
                        alt="OUTPUT" 
                        id="OUTPUT" 
                        className="menu-components-icon" 
                        onClick={(e) => componentOnClick(e, state)}
                        />
                        <label className="menu-components-label">OUTPUT</label>
                    </div>
                    <div className="menu-components-component">
                        <img
                        src={andImage}
                        alt="AND" 
                        id="AND" 
                        className="menu-components-icon" 
                        onClick={(e) => componentOnClick(e, state)}
                        />
                        <label className="menu-components-label">AND</label>
                    </div>
                    <div className="menu-components-component">
                        <img
                        src={orImage} 
                        alt="OR" 
                        id="OR" 
                        className="menu-components-icon" 
                        onClick={(e) => componentOnClick(e, state)}
                        />
                        <label className="menu-components-label">OR</label>
                    </div>
                    <div className="menu-components-component">
                        <img 
                        src={notImage} 
                        alt="NOT" 
                        id="NOT" 
                        className="menu-components-icon" 
                        onClick={(e) => componentOnClick(e, state)}
                        />
                        <label className="menu-components-label">NOT</label>
                    </div>
                    <div className="menu-components-component">
                        <img 
                        src={nandImage} 
                        alt="NAND" 
                        id="NAND" 
                        className="menu-components-icon" 
                        onClick={(e) => componentOnClick(e, state)}
                        />
                        <label className="menu-components-label">NAND</label>
                    </div>
                    <div className="menu-components-component">
                        <img 
                        src={norImage} 
                        alt="NOR" 
                        id="NOR" 
                        className="menu-components-icon" 
                        onClick={(e) => componentOnClick(e, state)}
                        />
                        <label className="menu-components-label">NOR</label>
                    </div>
                    <div className="menu-components-component">
                        <img 
                        src={xorImage} 
                        alt="XOR" 
                        id="XOR" 
                        className="menu-components-icon" 
                        onClick={(e) => componentOnClick(e, state)}
                        />
                        <label className="menu-components-label">XOR</label>
                    </div>
                    <div className="menu-components-component">
                        <img 
                        src={xnorImage} 
                        alt="XNOR" 
                        id="XNOR" 
                        className="menu-components-icon" 
                        onClick={(e) => componentOnClick(e, state)}
                        />
                        <label className="menu-components-label">XNOR</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ComponentMenu;