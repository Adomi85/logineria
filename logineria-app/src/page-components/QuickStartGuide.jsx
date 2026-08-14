import QuickStartTextComponent from "../page-components/QuickStartTextComponent";
import { hideQuickStartGuide } from "../animations/animations.js";

const QuickStartGuide = () => {

    return (
        <>
            <div id="quick-start-guide" className="quick-start-guide-container">
                <QuickStartTextComponent title={guideTitle1} text={guideText1} id="quick-start-1" />
                <QuickStartTextComponent title={guideTitle2} text={guideText2} id="quick-start-2" />
                <QuickStartTextComponent title={guideTitle3} text={guideText3} id="quick-start-3" />
                <QuickStartTextComponent title={guideTitle4} text={guideText4} id="quick-start-4" />
                <QuickStartTextComponent title={guideTitle5} text={guideText5} id="quick-start-5" />
                <QuickStartTextComponent title={guideTitle6} text={guideText6} id="quick-start-6" />
                <div className="quick-start-footer">
                    <button className="quick-start-hide-button" onClick={hideQuickStartGuide}>
                        hide
                    </button>
                </div>
            </div>
        </>
    )
}

export default QuickStartGuide;

const guideTitle1 = "Adding Components";
const guideText1 = "You can add components on to the canvas area by clicking on the desired component in the menu, and drag your mouse over the canvas and clicking the canvas area where you want to place the component.";
const guideTitle2 = "Moving Components";
const guideText2 = "You can move the components on the canvas area by clicking and holding down the mouse button on the component, then dragging the component to the desired location and releasing the mouse button.";
const guideTitle3 = "Wire Connections";
const guideText3 = "You can connect the components to each other via wires by clicking the add wire button. Each component will highlight connection points on the components. Click on the 2 connection points to connect the components with a wire.";
const guideTitle4 = "Selecting and Deleting Components";
const guideText4 = "You can select components on the canvas by clicking on the component. This will highlight the component color indicating that it is selected. You can select multiple components, including wires and delete them by clicking the delete selected button after selecting the desired components. You can also deselect components by clicking on the componente again.";
const guideTitle5 = "Saving and Loading Circuits";
const guideText5 = "You can save your circuit by clicking the export button on the menu. This will download a JSON file containing your circuit data to you local machine. You can load a previously saved circuit by clicking the import button on the menu and selecting the presiously saved JSON file.";
const guideTitle6 = "Clearing the Canvas";
const guideText6 = "You can clear the canvas by clicking the New Canvas button on the menu. This will remove all components and wires from the canvas area. A confirmation dialog will appear to make sure you want to clear the canvas.";
