// Get the necessary elements
const display = document.querySelector('.calculator-display');
const keys = document.querySelectorAll('.calculator-keys button');

// Initialize the calculator state
let currentValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

// Function to update the display
function updateDisplay() {
  display.textContent = currentValue;
}

// Function to handle number button clicks
function handleNumberClick(value) {
  if (currentValue === '0' || waitingForSecondValue) {
    currentValue = value;
  } else {
    currentValue += value;
  }
  waitingForSecondValue = false;
  updateDisplay();
}

// Function to handle operator button clicks
function handleOperatorClick(action) {
  if (firstValue !== null && operator !== null) {
    calculate();
  }
  firstValue = parseFloat(currentValue);
  operator = action;
  waitingForSecondValue = true;
}

// Function to handle the equals button click
function handleEqualsClick() {
  if (firstValue !== null && operator !== null) {
    calculate();
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
  }
  updateDisplay();
}

// Function to handle the clear button click
function handleClearClick() {
  currentValue = '0';
  firstValue = null;
  operator = null;
  waitingForSecondValue = false;
  updateDisplay();
}

// Function to handle the decimal button click
function handleDecimalClick() {
  if (!currentValue.includes('.')) {
    currentValue += '.';
    updateDisplay();
  }
}

// Function to perform the calculation
function calculate() {
  const secondValue = parseFloat(currentValue);
  let result;
  switch (operator) {
    case 'add':
      result = firstValue + secondValue;
      break;
    case 'substract':
      result = firstValue - secondValue;
      break;
    case 'multiply':
      result = firstValue * secondValue;
      break;
    case 'divide':
      result = firstValue / secondValue;
      break;
    default:
      return;
  }
  currentValue = result.toString();
}

// Add event listeners to the buttons
keys.forEach(key => {
  key.addEventListener('click', () => {
    const action = key.dataset.action;
    if (!action) {
      handleNumberClick(key.textContent);
    } else {
      switch (action) {
        case 'add':
        case 'substract':
        case 'multiply':
        case 'divide':
          handleOperatorClick(action);
          break;
        case 'calculate':
          handleEqualsClick();
          break;
        case 'clear':
          handleClearClick();
          break;
        case 'decimal':
          handleDecimalClick();
          break;
      }
    }
  });
});

// Block Right Click
document.addEventListener('contextmenu', function(event) {
  event.preventDefault();
});