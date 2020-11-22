let currentTotal = 0; 
let displayValue = "0";
let isCurrentInputFinished = true;

let previousOperator = null;

const calcScreen = document.querySelector(".calculator__display");

document.querySelector('.calculator').addEventListener("click",function(event){
    if(!event.target.classList.contains("calculator__button")) {
        return;
    }
    buttonClick(event.target.innerHTML);
});

function buttonClick(value){
    if(isNaN(parseInt(value)) && value !== "."){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    rerenderScreen();
}

function handleSymbol(value){
    switch (value){
        case "CE":
            displayValue = "0";
            currentTotal = 0;
            previousOperator = null;
            break;
        case "=":
            if (previousOperator === null) { 
                return;
            }
            flushOperation(parseFloat(displayValue));
            displayValue = "" + currentTotal;
            previousOperator = null;
            currentTotal = 0;
            break;
        case "C":
            if (displayValue.length === 1) { 
                displayValue = "0";
            } else {
                displayValue = displayValue.substring(0,displayValue.length-1); 
            }
            break;
        default:
            handleMath(value);
            break;
    }
    isCurrentInputFinished = true;
}

function handleNumber(value){
    if (displayValue === "0" && value === "0") {
        return;
    }
    if (value === "." && displayValue.includes(".")) {
        return;
    }
    if(isCurrentInputFinished && value !== "."){
        displayValue = value;
    }else{
        displayValue += value;
    }
    isCurrentInputFinished = false;
}

function handleMath(value){
    const internalBuffer = parseFloat(displayValue);
    
    if (currentTotal === 0){
        currentTotal = internalBuffer;
    }else{
        flushOperation(internalBuffer);
    }

    previousOperator = value;
}

function flushOperation(internalBuffer){
    if(previousOperator === "+"){
        currentTotal += internalBuffer;
    }else if(previousOperator === "-"){
        currentTotal -= internalBuffer;
    }else if(previousOperator === "*"){
        currentTotal *= internalBuffer;
    }else{
        currentTotal /= internalBuffer;
    }
    const roundedValue = currentTotal.toFixed(8);
    currentTotal = parseFloat(roundedValue);
}

function rerenderScreen(){
    calcScreen.value = displayValue;
}