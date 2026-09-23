# Changelog

## 23.9.2026

- Removed unnecessary code from delete selected function.
- Removed possibility to connect wires to the same component the wire begins in.
- Capture image now opens a window where user can adjust the circuit position. The Captured image will be made from circuitry visible in the popup window.
- Importing now propts user if the canvas is not clear. Proceeding will clear the canvas.


## 19.9.2026

- Marjor changes to simulation logic, add wire, wire position, delete functions..
- It is now possible to connect wires to wires. Multiple connection can be made this way, runSim logic will also support this and result any confliting input values properly.
- UI has had slight updates on style.
- Added a new features: 
    - Users may now also download image of the circuit to their local machine via "Capture as image" -button.
    - Users may reset the circuit input/output values via "Reset input/output" -button.
- Updated application architecture: restructured file location, refactored code to reflect these changes.
 
## 3.9.2026

- Changed simulation logic behind run simulation button. This change fixed issue with looping render behaviour from previous states..

## 14.8.2026

- Added Quick Start Guide to button to menu and collapsible Quick Start Guide sidebar, which is controlled by the menu button.


## 13.8.2026

Changes:

- Added features New Canvas, Import and Export, which give user the option to save circuit canvas locally as json file and load saved canvas file.
- Improved error handling

## 10.8.2026

Changes:

- Reworked Application UI/UX.

## 1.8.2026

Changes:

- Added Input and Output components.
- Added first working version of core business logic for components.

## 8.6.2026

Changes:

- Changed how software renders component, from state that renders components then embeds the components with data to state that tracks changes in data then renders matching components.
- Most functions have been changed to reflect the change mentioned above.
- Moving components by dragging also changes position information of the data objects.
- Included a wiring feature that also tracks the position of attached component and changes position accordingly.

Planned next features:
- New components input and output.
- Core business logic implementation.
- Error handling.
- Business logic visual effects.

