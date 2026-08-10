import andImage from "../assets/and.png";
import orImage from "../assets/or.png";
import notImage from "../assets/not.png";
import nandImage from "../assets/nand.png";
import norImage from "../assets/nor.png";
import xorImage from "../assets/xor.png";
import xnorImage from "../assets/xnor.png";
import emptyImage from "../assets/emptybox.png";

const PointerComponent = () => {
    return (
        <>
            <div className="pointer" >
                <div className="pointer-and">
                    <img src={andImage} alt="AND" className="pointer-icon"/>
                </div>
                <div className="pointer-or">
                    <img src={orImage} alt="OR" className="pointer-icon"/>
                </div>
                <div className="pointer-not">
                    <img src={notImage} alt="NOT" className="pointer-icon"/>
                </div>
                <div className="pointer-nand">
                    <img src={nandImage} alt="NAND" className="pointer-icon"/>
                </div>
                <div className="pointer-nor">
                    <img src={norImage} alt="NOR" className="pointer-icon"/>
                </div>
                <div className="pointer-xor">
                    <img src={xorImage} alt="XOR" className="pointer-icon"/>
                </div>
                <div className="pointer-xnor">
                    <img src={xnorImage} alt="XNOR" className="pointer-icon"/>
                </div>
                <div className="pointer-input">
                    <img src={emptyImage} alt="INPUT" className="pointer-icon"/>
                </div>
                <div className="pointer-output">
                    <img src={emptyImage} alt="OUTPUT" className="pointer-icon"/>
                </div>
            </div>
        </>
    )
}

export default PointerComponent;