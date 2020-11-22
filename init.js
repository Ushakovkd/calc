const buttonLabels = ['CE','C','/','*','7','8','9','-','4','5','6','+','1','2','3','=','0','.'];
const calculatorDisplayElementData = {tag: 'input', className: 'calculator__display', value: '0', type: 'text'};
const calculatorElementData = {tag: 'div', className: 'calculator'}
const containerElementData = {tag: 'div', className: 'container'}

const calculatorElement = createElement(calculatorElementData);

const calculatorDisplayElement = createElement(calculatorDisplayElementData);
calculatorElement.append(calculatorDisplayElement);

for (let i = 0; i < buttonLabels.length; i++) {
    const label = buttonLabels[i];
    const buttonElement = createElement({tag: 'button', className: 'calculator__button', innerHTML: label});
    if (label == "0") {
        buttonElement.classList.add('horizontal-span_2');
    }
    calculatorElement.append(buttonElement);
}

const calculatorContainerElement = createElement(containerElementData);
calculatorContainerElement.append(calculatorElement);

document.body.append(calculatorContainerElement);
document.querySelector('.calculator').addEventListener("click",function(event){
    if(!event.target.classList.contains("calculator__button")) {
        return;
    }
    buttonClick(event.target.innerHTML);
});

function createElement(data) {
    const {tag, className, value, type, innerHTML} = data;
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    if (value) {
        element.value = value;
    }
    if (type) {
        element.type = type;
    }
    if (innerHTML) {
        element.innerHTML = innerHTML;
    }
    return element;
}