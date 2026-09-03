import OutputComponent from "./OutputComponent.jsx";
import InputComponent from "./InputComponent.jsx";
import TwoInputGate from "./TwoInputGate.jsx";
import SingleInputGate from "./SingleInputGate.jsx";

import andImage from "../assets/AND.png";
import andSelectedImage from "../assets/AND_selected.png";
import orImage from "../assets/OR.png";
import orSelectedImage from "../assets/OR_selected.png";
import notImage from "../assets/NOT.png";
import notSelectedImage from "../assets/NOT_selected.png";
import nandImage from "../assets/NAND.png";
import nandSelectedImage from "../assets/NAND_selected.png";
import norImage from "../assets/NOR.png";
import norSelectedImage from "../assets/NOR_selected.png";
import xorImage from "../assets/XOR.png";
import xorSelectedImage from "../assets/XOR_selected.png";
import xnorImage from "../assets/XNOR.png";
import xnorSelectedImage from "../assets/XNOR_selected.png";

const LogicComponent = ({ node, state }) => {

    switch(node.type) {

        case "INPUT":
            return <InputComponent key={node.id} node={node} state={state} />;
        case "OUTPUT":
            return <OutputComponent key={node.id} node={node} state={state} />;
        case "NOT":
            return <SingleInputGate key={node.id} 
                node={node}
                state={state}
                componentImg={notImage}
                selectedImg={notSelectedImage}
            />
        case "AND":
            return <TwoInputGate key={node.id} 
                node={node}
                state={state}
                componentImg={andImage}
                selectedImg={andSelectedImage}
            />
        case "OR":
            return <TwoInputGate key={node.id}
                node={node}
                state={state}
                componentImg={orImage}
                selectedImg={orSelectedImage}
            />
        case "NAND":
            return <TwoInputGate key={node.id}
                node={node}
                state={state}
                componentImg={nandImage}
                selectedImg={nandSelectedImage}
            />
        case "NOR":
            return <TwoInputGate key={node.id}
                node={node}
                state={state}
                componentImg={norImage}
                selectedImg={norSelectedImage}
            />
        case "XOR":
            return <TwoInputGate key={node.id}
                node={node}
                state={state}
                componentImg={xorImage}
                selectedImg={xorSelectedImage}
            />
        case "XNOR":
            return <TwoInputGate key={node.id}
                node={node}
                state={state}
                componentImg={xnorImage}
                selectedImg={xnorSelectedImage}
            />
        default:
            return null;
    }
};

export default LogicComponent;