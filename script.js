const numbers = document.querySelectorAll("[data-number]");
const clearButton = document.querySelector("[data-allClear]");
const operators = document.querySelectorAll("[data-operator]");
const display = document.querySelector("[data-display]");
const del = document.querySelector('[data-delete]')
const equals = document.querySelector('[data-equals]');

// a class for the calculator

class Calculator {
    constructor(display){
        this.display = display
        this.clear()
    }

    clear(){
        this.displayValue = "";
        this.firstOperand = undefined
        this.operation = undefined
    }

    delete(){
     this.displayValue = this.displayValue.toString().slice(0,-1)
    }

    chooseOperation(operator){
        if(this.displayValue ==='')return
        if(this.firstOperand !== undefined){
            this.compute()
            this.updateDisplay()
        }
        this.operation = operator
        this.firstOperand = this.displayValue
        this.displayValue = ''

    }
    compute(){
        let result
        const previous = parseFloat(this.firstOperand);
        const current = parseFloat(this.displayValue)
        if (isNaN(previous)||isNaN(current))return
        switch (this.operation){
            case '+' :
                result = previous + current
                break;
            case '-' :
                result = previous - current
                break;
             case '÷' :
                result = previous / current
                break;
            case '×' :
                result = previous * current
                break;
            default:
                return
        }
        this.displayValue = result;
        this.operation = undefined;
        this.firstOperand = '';

    }

    updateDisplay(){
        this.display.innerHTML = this.displayValue; 
    }

    appendNumber(num){
        if (num ==='.' && this.displayValue.includes('.'))return
        this.displayValue += String(num)
    }
}

const calculator = new Calculator(display)


numbers.forEach(number=>number.addEventListener('click',function(e){
    calculator.appendNumber(number.innerHTML)
    calculator.updateDisplay()
}))

clearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()

})

del.addEventListener('click', () =>{
    calculator.delete();
    calculator.updateDisplay()
})

operators.forEach(operator => operator.addEventListener('click', (e) => {
    calculator.chooseOperation(operator.innerHTML)
}))

equals.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})
