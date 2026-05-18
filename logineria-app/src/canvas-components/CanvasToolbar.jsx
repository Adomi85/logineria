const CanvasToolbar = ({addElement}) => {

    return (
        <div className="canvas-toolbar">
            <button className="canvas-toolbar-btn" id="AND" onClick={(e) => addElement(e)}>
                AND
            </button>
            <button className="canvas-toolbar-btn" id="OR" onClick={(e) => addElement(e)}>
                OR
            </button>
            <button className="canvas-toolbar-btn" id="NOT" onClick={(e) => addElement(e)}>
                NOT
            </button>
            <button className="canvas-toolbar-btn" id="NAND" onClick={(e) => addElement(e)}>
                NAND
            </button>
            <button className="canvas-toolbar-btn" id="NOR" onClick={(e) => addElement(e)}>
                NOR
            </button>
            <button className="canvas-toolbar-btn" id="XOR" onClick={(e) => addElement(e)}>
                XOR
            </button>
            <button className="canvas-toolbar-btn" id="XNOR" onClick={(e) => addElement(e)}>
                XNOR
            </button>
        </div>
    )
}

export default CanvasToolbar;