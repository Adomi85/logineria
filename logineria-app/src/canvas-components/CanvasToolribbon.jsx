import { removeObj } from "../logic/canvasFunctions.js";

const CanvasToolribbon = ({state}) => {

    function getWires(state){
        console.log(state.wires);
    }

    function getNodes(state){
        console.log(state.nodes);
    }

    return (
        <section className="canvas-toolribbon-wrapper">
            <div >
                <button onClick={() => removeObj(state)}>Delete</button>
                <button onClick={() => getWires(state)}>Get Wires</button>
                <button onClick={() => getNodes(state)}>Get Nodes</button>
            </div>
        </section>
    )
}

export default CanvasToolribbon;