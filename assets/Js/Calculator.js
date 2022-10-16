class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    else if (this.currentOperand === "Invalid Input") {
      this.currentOperand = number.toString()
      this.previousOperand = ""
      this.operation = undefined
    }
    else this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  specialOperation(operation) {
    switch (operation) {
      case 1:
        if (this.currentOperand !== "") return
        else this.currentOperand = "3.14159265358"
        break
      case 2:
        if (this.currentOperand !== "") return
        else this.currentOperand = "2.71828182845"
        break
      case 3:
        if (this.currentOperand === "" || isNaN(this.currentOperand)) return
        else {
          this.operation = "^2"
          this.previousOperand = this.currentOperand
          this.compute()
        }
        break
      case 4:
        if (this.currentOperand === "" || isNaN(this.currentOperand)) return
        else {
          this.operation = '^'
          this.previousOperand = this.currentOperand
          this.currentOperand = ""
          this.compute()
        }
        break
      case 5:
        if (this.currentOperand === "" || isNaN(this.currentOperand)) return
        else {
          this.operation = "sqrt"
          this.previousOperand = this.currentOperand
          this.compute()
        }
        break
      case 6:
        if (this.currentOperand === "" || isNaN(this.currentOperand)) return
        else {
          this.operation = "log"
          this.previousOperand = this.currentOperand
          this.compute()
        }
        break
      default:
        return
    }
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      case "^2":
        computation = Math.pow(prev, 2)
        break
      case '^':
        computation = Math.pow(prev, current)
        break
      case "sqrt":
        computation = Math.sqrt(prev)
        break
      case "log":
        if (prev > 0) computation = Math.log10(prev)
        else computation = "Invalid Input"
        break
      default:
        return
    }
    this.currentOperand = computation
    if (this.operation !== "sqrt" && this.operation !== "log" && this.operation !== "^2") {
      this.operation = undefined
      this.previousOperand = ''
    }
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    if (this.currentOperand === "Invalid Input") {
      this.currentOperandTextElement.innerText = this.currentOperand
      this.previousOperandTextElement.innerText = ""
    }
    else this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      if (this.operation === "sqrt" || this.operation === "log")
        this.previousOperandTextElement.innerText = `${this.operation}(${this.getDisplayNumber(this.previousOperand)})`

      else this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`

    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.classList.contains("special")) {
      if (button.classList.contains("pie-button")) {
        calculator.specialOperation(1)
      }
      else if (button.classList.contains("e-button")) {
        calculator.specialOperation(2)
      }
      else if (button.classList.contains("square")) {
        calculator.specialOperation(3)
      }
      else if (button.classList.contains("pow")) {
        calculator.specialOperation(4)
      }
      else if (button.classList.contains("squareRoot")) {
        calculator.specialOperation(5)
      }
      else if (button.classList.contains("logBase10")) {
        calculator.specialOperation(6)
      }
    }
    else calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})