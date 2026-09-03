import { runSimulation } from "../logic/simLogic";

const RunSimComponent = ({ state }) => {

    return (
        <>
            <button className="btn-runsim" onClick={() => runSimulation(state)}>Run Simulation</button>
        </>
    )
}

export default RunSimComponent;