import { removeElement } from "../canvas-components/CanvasFunctions";

const CanvasToolribbon = ({selection, layer}) => {

    return (
        <section className="canvas-toolribbon-wrapper">
            <div >
                <button onClick={() => removeElement(selection, layer)}>Delete</button>
                <button>Button</button>
                <button>Button</button>
                <button>Button</button>
            </div>
        </section>
    )
}

export default CanvasToolribbon;