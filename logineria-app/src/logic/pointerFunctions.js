
const pointer = document.getElementsByClassName("pointer");

document.addEventListener("mousemove", (e) => {
    pointer[0].style.left = e.clientX - 2.5 + "px";
    pointer[0].style.top = e.clientY - 2.5 + "px";
});

export function pointerVisibility(mode){

    console.log(mode);

    const andPointer = document.getElementsByClassName("pointer-and")[0];
    const orPointer = document.getElementsByClassName("pointer-or")[0];
    const notPointer = document.getElementsByClassName("pointer-not")[0];
    const nandPointer = document.getElementsByClassName("pointer-nand")[0];
    const norPointer = document.getElementsByClassName("pointer-nor")[0];
    const xorPointer = document.getElementsByClassName("pointer-xor")[0];
    const xnorPointer = document.getElementsByClassName("pointer-xnor")[0];
    const inputPointer = document.getElementsByClassName("pointer-input")[0];
    const outputPointer = document.getElementsByClassName("pointer-output")[0];

    switch(mode){
        case 'INPUT':
            if(inputPointer.style.visibility === "visible"){
                inputPointer.style.visibility = "hidden";
            } else {
                inputPointer.style.visibility = "visible";
            }
            break;
        case 'OUTPUT':
            if(outputPointer.style.visibility === "visible"){
                outputPointer.style.visibility = "hidden";
            } else {
                outputPointer.style.visibility = "visible";
            }
            break;
        case 'AND':
            if(andPointer.style.visibility === "visible"){
                andPointer.style.visibility = "hidden";
            } else {
                andPointer.style.visibility = "visible";
            }
            break;
        case 'OR':
            if(orPointer.style.visibility === "visible"){
                orPointer.style.visibility = "hidden";
            } else {
                orPointer.style.visibility = "visible";
            }
            break;
        case 'NOT':
            if(notPointer.style.visibility === "visible"){
                notPointer.style.visibility = "hidden";
            } else {
                notPointer.style.visibility = "visible";
            }
            break;
        case 'NAND':
            if(nandPointer.style.visibility === "visible"){
                nandPointer.style.visibility = "hidden";
            } else {
                nandPointer.style.visibility = "visible";
            }
            break;
        case 'NOR':
            if(norPointer.style.visibility === "visible"){
                norPointer.style.visibility = "hidden";
            } else {
                norPointer.style.visibility = "visible";
            }
            break;
        case 'XOR':
            if(xorPointer.style.visibility === "visible"){
                xorPointer.style.visibility = "hidden";
            } else {
                xorPointer.style.visibility = "visible";
            }
            break;
        case 'XNOR':
            if(xnorPointer.style.visibility === "visible"){
                xnorPointer.style.visibility = "hidden";
            } else {
                xnorPointer.style.visibility = "visible";
            }
            break;
    }
}