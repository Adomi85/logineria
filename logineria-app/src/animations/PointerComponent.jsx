import andImage from "../assets/and.png";
import orImage from "../assets/or.png";
import notImage from "../assets/not.png";
import nandImage from "../assets/nand.png";
import norImage from "../assets/nor.png";
import xorImage from "../assets/xor.png";
import xnorImage from "../assets/xnor.png";
import emptyImage from "../assets/emptybox.png";

import PointerImage from "./PointerImage";

const PointerComponent = ({state}) => {
    return (
        <>
            <div className="pointer" >
                <PointerImage image={andImage} alt="AND" className="pointer-and" state={state} />
                <PointerImage image={orImage} alt="OR" className="pointer-or" state={state} />
                <PointerImage image={notImage} alt="NOT" className="pointer-not" state={state} />
                <PointerImage image={nandImage} alt="NAND" className="pointer-nand" state={state} />
                <PointerImage image={norImage} alt="NOR" className="pointer-nor" state={state} />
                <PointerImage image={xorImage} alt="XOR" className="pointer-xor" state={state} />
                <PointerImage image={xnorImage} alt="XNOR" className="pointer-xnor" state={state} />
                <PointerImage image={emptyImage} alt="INPUT" className="pointer-input" state={state} />
                <PointerImage image={emptyImage} alt="OUTPUT" className="pointer-output" state={state} />
            </div>
        </>
    )
}

export default PointerComponent;