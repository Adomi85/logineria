import { pointerVisibility } from "./pointerFunctions.js";

export function switchMode(type, mode, setMode){
    if(mode === 'idle'){
        setMode(type);
    }
    else {
        setMode('idle');
    }
}

export function componentOnClick(e, state){
    const componentType = e.currentTarget.id;

    switchMode(componentType, state.mode, state.setMode);
    pointerVisibility(componentType);
}

export function wireModeOnClick(state){
    switchMode('WIRE', state.mode, state.setMode);

}
