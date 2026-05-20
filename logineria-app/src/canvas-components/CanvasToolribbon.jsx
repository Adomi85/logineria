import { removeElement } from "../canvas-components/CanvasFunctions";

const CanvasToolribbon = ({selection, layer, setSelection}) => {

    return (
        <section className="canvas-toolribbon-wrapper">
            <div >
                <button onClick={() => removeElement(selection, layer, setSelection)}>Delete</button>
                <button>Button</button>
                <button>Button</button>
                <button>Button</button>
            </div>
        </section>
    )
}

export default CanvasToolribbon;