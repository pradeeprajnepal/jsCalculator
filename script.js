class Calculator {
    constructor(previousOperandTextDiv,currentOperandTextDiv){
        this.previousOperandTextDiv= previousOperandTextDiv
        this.currentOperandTextDiv= currentOperandTextDiv
        this.clear()
    }
    
    clear(){
        this.currentOperand=""
        this.previousOperand=""
        this.operation = undefined
    }

    delete(){
        this.currentOperand=this.currentOperand.toString().slice(0,-1);
    }

    chooseOperaton(operation){ 
        if (this.currentOperand==="")return
        if(this.currentOperand !=""){
            this.compute();
        }
        this.operation = operation
        this.previousOperand= this.currentOperand
        this.currentOperand= ""
    }

    appendNumber(number){
        
        if (number === "." && this.currentOperand.includes(".")) return
        this.currentOperand= this.currentOperand.toString()+number.toString();    
    }

    compute(){
        let computation
        const prev= parseFloat(this.previousOperand)
        const current= parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case "+":
                computation= prev+current
                break;
                case "-":
                    computation= prev-current
                    break;
                    case "*":
                        computation=prev * current
                        break;
                        case "/":
                            computation= prev/current
                            break;
                            default:
                                return
        }
        this.currentOperand= computation;
        this.operation=undefined
        this.previousOperand=""
    }

    getDisplayNumber(number){
        let stringNumber= number.toString();
        let integerDigit = parseFloat(stringNumber.split(".")[0]);
        let decimalNum= stringNumber.split(".")[1];
        let integerDisplay
        if (isNaN(integerDigit)){
            integerDisplay=""
        }else{
            integerDisplay= integerDigit.toLocaleString('en',{maximumFractionDigits:0})
        }
        if (decimalNum != null){
            return `${integerDisplay}.${decimalNum}`
        }else{
            return integerDisplay
        }

    }
    updateDisplay(){
this.currentOperandTextDiv.innerText= this.getDisplayNumber(this.currentOperand);
if (this.operation != null ){
    this.previousOperandTextDiv.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
}else{
    this.previousOperandTextDiv.innerText="";
}
}
}

const numberButtons= document.querySelectorAll('[data-number]');
const operationButtons= document.querySelectorAll("[data-operations]");
const clearButton= document.querySelector("[data-clear]");
const delButton= document.querySelector("[data-del]");
const equalButton= document.querySelector("[data-equal]");
const previousOperandTextDiv= document.querySelector("[data-pervious-operand]");
const currentOperandTextDiv= document.querySelector("[data-current-operand]");

const calculator= new Calculator (previousOperandTextDiv,currentOperandTextDiv);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
      calculator.new
    })
  })

  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperaton(button.innerText)
      calculator.updateDisplay()
    })
  })

  clearButton.addEventListener("click",()=>{
    calculator.clear();
    calculator.updateDisplay();
  })

  delButton.addEventListener("click",()=>{
      calculator.delete();
      calculator.updateDisplay();
  })

  equalButton.addEventListener("click",()=>{
      calculator.compute();
      calculator.updateDisplay();
  })

  