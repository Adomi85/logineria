const CanvasToolbar = ({mode, setMode}) => {

    function componentMode(e, mode, setMode){  
        if(mode === e.target.id){
            setMode('idle');
        }

        setMode(e.target.id);
    }

    return (
        <div className="canvas-toolbar">
            <button className="canvas-toolbar-btn" id="WIRE" onClick={(e) => componentMode(e, mode, setMode)}>
                WIRE
            </button>
            <button className="canvas-toolbar-btn" id="AND" onClick={(e) => componentMode(e, mode, setMode)}>
                AND
            </button>
            <button className="canvas-toolbar-btn" id="OR" onClick={(e) => componentMode(e, mode, setMode)}>
                OR
            </button>
            <button className="canvas-toolbar-btn" id="NOT" onClick={(e) => componentMode(e, mode, setMode)}>
                NOT
            </button>
            <button className="canvas-toolbar-btn" id="NAND" onClick={(e) => componentMode(e, mode, setMode)}>
                NAND
            </button>
            <button className="canvas-toolbar-btn" id="NOR" onClick={(e) => componentMode(e, mode, setMode)}>
                NOR
            </button>
            <button className="canvas-toolbar-btn" id="XOR" onClick={(e) => componentMode(e, mode, setMode)}>
                XOR
            </button>
            <button className="canvas-toolbar-btn" id="XNOR" onClick={(e) => componentMode(e, mode, setMode)}>
                XNOR
            </button>
        </div>
    )
}

export default CanvasToolbar;