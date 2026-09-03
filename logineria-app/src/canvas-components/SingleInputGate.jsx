import { Image, Group, Circle} from "react-konva";
import { useState, useRef, useEffect } from  "react";
import useImage from "use-image";

import { changeImage, changeWireMode } from "../animations/animations.js";
import { updateNodePosition, selectObj, updateWirePosition } from "../logic/canvasFunctions.js";

const SingleInputGate = ({node, state, componentImg, selectedImg}) => {
    const [image] = useImage(componentImg);
    const [position] = useState(node.position);
    const [selectedImage] = useImage(selectedImg);
    const groupRef = useRef(null);

    useEffect(() => {
        changeWireMode(state, groupRef);

    }, [state])

    return (
        <>
            <Group type={node.type} {...node} x={position.x} y={position.y} ref={groupRef} draggable onDragMove={(e) => updateWirePosition(e, state)} onDragEnd={(e) => updateNodePosition(e, state)}>
                <Image image={image} width={60} height={40} x={0} y={0} onClick={(e) => {
                    changeImage(e,{ image, selectedImage }, state);
                    selectObj(e, state);
                    }}/>
                <Circle radius={3} x={0} y={20} fill="transparent" id={"in1"} type={"gate_port"} name={"port"} portface={"left"} />
                <Circle radius={3} x={58.5} y={20} fill="transparent" id={"out"} type={"gate_port"} name={"port"} portface={"right"} />
            </Group>
        </>
    )
}

export default SingleInputGate;