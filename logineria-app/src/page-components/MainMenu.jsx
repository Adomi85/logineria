import "../styles/menu.css";

import { hideQuickStartGuide } from "../animations/animations.js";
import ComponentMenu from "../mainmenu-components/ComponentMenu.jsx";
import { exportCanvas, clearCanvasQuery, importCanvas } from "../logic/canvasFunctions.js";

const MainMenu = ({state}) => {
        
    return (
        <>
            <section  className="menu-container">
                    <p className="menu-title">Logineria</p>
                    <div className="menu-buttons">
                        <button className="menu-button" onClick={hideQuickStartGuide}>Quick Start Guide</button>
                        <button className="menu-button" onClick={() => {console.log(state.wires); console.log(state.nodes); console.log(state.wirePorts);}}>Debug</button>
                    </div>
                    <hr className="menu-divider"/>
                    <div className="menu-buttons">
                        <button className="menu-button" onClick={() => clearCanvasQuery(state)}>New Canvas</button>
                        <button className="menu-button" onClick={() => importCanvas(state)}>Import</button>
                        <button className="menu-button" onClick={() => exportCanvas(state)}>Export</button>
                    </div>
                    <hr className="menu-divider"/>
                    <ComponentMenu state={state}/>
            </section>
        </>
    )
}

export default MainMenu;