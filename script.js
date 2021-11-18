const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const operationScreen = document.getElementById('operationScreen')
const calculationScreen = document.getElementById('calculationScreen')
const allClear = document.getElementById('allClear')
const decimalPoint = document.getElementById('decimal')
const equalButton = document.getElementById('equalButton')

let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let resetScreen = false;

/*
    !! FUNCTIONS OF THE CALCULATOR !!
*/

const displayNumOnScreen = (number) => {
    if(operationScreen === '0' || resetScreen)
        clearScreen()

    operationScreen.textContent += number
}

const setDecimalPoint = () => {
    if (operationScreen.textContent.includes('.')) {
        return 'Error: Cannot contain more than one decimal point'
    } else {
        operationScreen.textContent += '.'
    }
}

const clearScreen = () => {
    operationScreen.textContent = ""
    resetScreen = false;
}

const clear = () => {
    operationScreen.textContent = ""
    calculationScreen.textContent = ""
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
}


const evaluate = () => {
    if (currentOperation === null || resetScreen) return
    if (currentOperation === '÷' && operationScreen.textContent === '0') {
        alert("You can't divide by 0!")
        return
    }

    secondOperand = operationScreen.textContent
    operationScreen.textContent = roundResult(
        operation(currentOperation, firstOperand, secondOperand)
    )
    calculationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null
}


const setOperation = (operator) => {
    if (currentOperation !== null) evaluate()
    firstOperand = operationScreen.textContent;
    currentOperation = operator;
    operationScreen.textContent = `${firstOperand} ${currentOperation}`
    calculationScreen.textContent = operationScreen.textContent;
    resetScreen = true;
}   

const roundResult = (number) => {
    return Math.round(number * 1000) / 1000;
}
/*
    !! MATHEMATICS OPERATIONS HERE !!
*/

const addition = (num1, num2) => num1 + num2
const subtraction = (num1, num2) => num1 - num2
const multiply = (num1, num2) => num1 * num2
const divide = (num1, num2) => num2 == 0 ? 'NaN' : num1 / num2

const operation = (operator, num1, num2) => {
    num1 = Number(num1)
    num2 = Number(num2)

    switch(operator) {
        case '+':
            return addition(num1, num2);
            break;
        
        case '-':
            return subtraction(num1, num2);
            break;
        
        case '*':
            return multiply(num1, num2);
            break;
        
        case '÷':
            return divide(num1, num2);
            break;
        
        default:
            return null;
            break;
    }
}


/*
    !! EVENT LISTENERS DOWN HERE !!
*/
allClear.addEventListener('click', clear)

numberButtons.forEach((numberButton) =>
    numberButton.addEventListener('click', () => {
        displayNumOnScreen(numberButton.textContent)
    })
)

decimalPoint.addEventListener('click', () => {
    setDecimalPoint()
})

operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener('click', () => {
        setOperation(operatorButton.textContent)
    })
})

equalButton.addEventListener('click', () => {
    evaluate()
})