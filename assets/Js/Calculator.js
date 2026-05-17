class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    // Display elements
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement

    this.clear()
  }

  // Reset calculator
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  // Remove last character
  delete() {
    this.currentOperand =
      this.currentOperand.toString().slice(0, -1)
  }

  // Add number to current input
  appendNumber(number) {

    // Prevent multiple decimal points
    if (
      number === '.' &&
      this.currentOperand.includes('.')
    ) return

    // Reset after invalid input
    if (this.currentOperand === "Invalid Input") {
      this.currentOperand = number.toString()
      this.previousOperand = ''
      this.operation = undefined
    }
    else {
      this.currentOperand =
        this.currentOperand.toString() +
        number.toString()
    }
  }

  // Store operation
  chooseOperation(operation) {

    // Ignore if no number entered
    if (this.currentOperand === '') return

    // Compute existing operation first
    if (this.previousOperand !== '') {
      this.compute()
    }

    this.operation = operation
    this.previousOperand =
      this.currentOperand

    this.currentOperand = ''
  }


  // Special buttons
  // 1 = π
  // 2 = e
  // 3 = x²
  // 4 = xʸ
  // 5 = √x
  // 6 = log10

  specialOperation(operation) {

    switch (operation) {

      // PI
      case 1:
        this.currentOperand = Math.PI
        break


      // Euler number
      case 2:
        this.currentOperand = Math.E
        break


      // Square x²
      case 3:

        if (
          this.currentOperand === "" ||
          isNaN(this.currentOperand)
        ) return

        this.operation = "^2"
        this.previousOperand =
          this.currentOperand

        this.compute()

        break


      // Power xʸ
      case 4:

        if (
          this.currentOperand === "" ||
          isNaN(this.currentOperand)
        ) return

        // Wait for user to enter exponent
        this.operation = "^"

        this.previousOperand =
          this.currentOperand

        this.currentOperand = ''

        break


      // Square root
      case 5:

        if (
          this.currentOperand === "" ||
          isNaN(this.currentOperand)
        ) return

        this.operation = "sqrt"

        this.previousOperand =
          this.currentOperand

        this.compute()

        break


      // Log base 10
      case 6:

        if (
          this.currentOperand === "" ||
          isNaN(this.currentOperand)
        ) return

        this.operation = "log"

        this.previousOperand =
          this.currentOperand

        this.compute()

        break


      default:
        return
    }
  }



  // Main calculation logic
  compute() {

    let computation

    const prev =
      parseFloat(this.previousOperand)

    const current =
      parseFloat(this.currentOperand)


    // Unary operations only need prev
    if (
      this.operation === "sqrt" ||
      this.operation === "log" ||
      this.operation === "^2"
    ) {

      if (isNaN(prev)) return
    }

    // Binary operations need both
    else {

      if (
        isNaN(prev) ||
        isNaN(current)
      ) return
    }



    switch (this.operation) {

      case '+':

        computation =
          prev + current

        break


      case '-':

        computation =
          prev - current

        break


      case '*':

        computation =
          prev * current

        break


      case '÷':

        // prevent divide by zero
        if (current === 0) {
          computation = "Invalid Input"
        }
        else {
          computation =
            prev / current
        }

        break


      case "^2":

        computation =
          Math.pow(prev, 2)

        break


      case '^':

        computation =
          Math.pow(prev, current)

        break


      case "sqrt":

        if (prev < 0)
          computation = "Invalid Input"

        else
          computation =
            Math.sqrt(prev)

        break


      case "log":

        if (prev <= 0)
          computation = "Invalid Input"

        else
          computation =
            Math.log10(prev)

        break


      default:
        return
    }


    this.currentOperand =
      computation

    this.operation =
      undefined

    this.previousOperand = ''
  }



  // Format display with commas
  getDisplayNumber(number) {

    const stringNumber =
      number.toString()

    const integerDigits =
      parseFloat(
        stringNumber.split('.')[0]
      )

    const decimalDigits =
      stringNumber.split('.')[1]

    let integerDisplay

    if (isNaN(integerDigits)) {

      integerDisplay = ''

    } else {

      integerDisplay =
        integerDigits.toLocaleString(
          'en',
          { maximumFractionDigits: 0 }
        )
    }


    if (decimalDigits != null) {

      return `${integerDisplay}.${decimalDigits}`

    } else {

      return integerDisplay
    }
  }



  // Update screen
  updateDisplay() {

    if (
      this.currentOperand ===
      "Invalid Input"
    ) {

      this.currentOperandTextElement.innerText =
        this.currentOperand

      this.previousOperandTextElement.innerText =
        ""

      return
    }


    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(
        this.currentOperand
      )


    if (this.operation != null) {

      if (
        this.operation === "sqrt" ||
        this.operation === "log"
      ) {

        this.previousOperandTextElement.innerText =
          `${this.operation}(${this.getDisplayNumber(this.previousOperand)})`

      }

      else {

        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      }

    }

    else {

      this.previousOperandTextElement.innerText =
        ''
    }
  }
}




// Select buttons/elements
const numberButtons =
document.querySelectorAll(
  '[data-number]'
)

const operationButtons =
document.querySelectorAll(
  '[data-operation]'
)

const equalsButton =
document.querySelector(
  '[data-equals]'
)

const deleteButton =
document.querySelector(
  '[data-delete]'
)

const allClearButton =
document.querySelector(
  '[data-all-clear]'
)

const previousOperandTextElement =
document.querySelector(
  '[data-previous-operand]'
)

const currentOperandTextElement =
document.querySelector(
  '[data-current-operand]'
)



// Create calculator object
const calculator =
new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
)



// Number click events
numberButtons.forEach(button => {

  button.addEventListener(
    'click',
    () => {

      calculator.appendNumber(
        button.innerText
      )

      calculator.updateDisplay()
    }
  )
})



// Operation click events
operationButtons.forEach(button => {

  button.addEventListener(
    'click',
    () => {

      if (
        button.classList.contains(
          "special"
        )
      ) {

        if (
          button.classList.contains(
            "pie-button"
          )
        )
          calculator.specialOperation(1)

        else if (
          button.classList.contains(
            "e-button"
          )
        )
          calculator.specialOperation(2)

        else if (
          button.classList.contains(
            "square"
          )
        )
          calculator.specialOperation(3)

        else if (
          button.classList.contains(
            "pow"
          )
        )
          calculator.specialOperation(4)

        else if (
          button.classList.contains(
            "squareRoot"
          )
        )
          calculator.specialOperation(5)

        else if (
          button.classList.contains(
            "logBase10"
          )
        )
          calculator.specialOperation(6)

      }

      else {

        calculator.chooseOperation(
          button.innerText
        )
      }

      calculator.updateDisplay()
    })
})



// Equals button
equalsButton.addEventListener(
'click',
() => {

  calculator.compute()

  calculator.updateDisplay()
})



// AC button
allClearButton.addEventListener(
'click',
() => {

  calculator.clear()

  calculator.updateDisplay()
})



// DEL button
deleteButton.addEventListener(
'click',
() => {

  calculator.delete()

  calculator.updateDisplay()
})
