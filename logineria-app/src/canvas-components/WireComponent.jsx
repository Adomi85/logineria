import { useState, useEffect } from "react";
import { Line, Group } from "react-konva";
import { selectObj } from "../logic/canvasFunctions.js";

const WireComponent = ({ wire, state }) => {
    const [points, setPoints] = useState([wire.start.x, wire.start.y, ...wire.midpoints, wire.end.x, wire.end.y]);
    

    useEffect(() => {
        function updateWirePoints(wire, setPoints){
            const newPoints = [wire.start.x, wire.start.y, ...wire.midpoints, wire.end.x, wire.end.y];
            setPoints(newPoints);
        }

        updateWirePoints(wire, setPoints);
    }, [wire, state]);
    
    
    return (
        <>
            <Group type={"WIRE"} key={wire.id} {...wire} >
                <Line points={points} 
                    name="visual-wire" 
                    lineCap="round" 
                    lineJoin="round" 
                    stroke="black" 
                    strokeWidth={1.5}
                />
                <Line points={points} 
                    name="selection-wire" 
                    lineCap="round" 
                    lineJoin="round" 
                    stroke="transparent" 
                    strokeWidth={20}
                    onClick={(e) => {
                        if(state.mode !== 'WIRE'){
                            selectObj(e, state);
                        }
                    }}
                />
            </Group>
        </>
    )
}

export default WireComponent;