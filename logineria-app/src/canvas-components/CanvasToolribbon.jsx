import { removeObj } from "../logic/canvasFunctions.js";

const CanvasToolribbon = ({state}) => {

    return (
        <section className="canvas-toolribbon-wrapper">
            <div >
                <button onClick={() => removeObj(state)}>Delete</button>
                <button>Button</button>
                <button>Button</button>
            </div>
        </section>
    )
}

export default CanvasToolribbon;