import "../styles/menu.css";

import ComponentMenu from "../mainmenu-components/ComponentMenu.jsx";
import { exportCanvas, clearCanvasQuery, importCanvas } from "../logic/canvasFunctions.js";

const MainMenu = ({state}) => {
        
    return (
        <>
            <aside  className="menu-container">
                    <p className="menu-title">Logineria</p>
                    <hr className="menu-divider"/>
                    <div className="menu-buttons">
                        <button className="menu-button" onClick={() => clearCanvasQuery(state)}>New Canvas</button>
                        <button className="menu-button" onClick={() => importCanvas(state)}>Import</button>
                        <button className="menu-button" onClick={() => exportCanvas(state)}>Export</button>
                    </div>
                    <hr className="menu-divider"/>
                    <ComponentMenu state={state}/>
            </aside>
        </>
    )
}

export default MainMenu;