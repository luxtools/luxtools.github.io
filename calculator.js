const display = document.getElementById('calc-display');
const buttons = document.querySelectorAll('.keypad button');

let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function clear() {
  display.value = '0';
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
}

function inputDigit(digit) {
  if (waitingForSecondOperand) {
    display.value = digit;
    waitingForSecondOperand = false;
  } else {
    display.value = display.value === '0' ? digit : display.value + digit;
  }
}

function inputDecimal() {
  if (waitingForSecondOperand) {
    display.value = '0.';
    waitingForSecondOperand = false;
    return;
  }
  if (!display.value.includes('.')) {
    display.value += '.';
  }
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(display.value);

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    display.value = String(result);
    firstOperand = result;
  }

  waitingForSecondOperand = true;
  operator = nextOperator;
}

function calculate(first, second, op) {
  switch (op) {
    case '+':
      return first + second;
    case '-':
      return first - second;
    case '×':
      return first * second;
    case '÷':
      return first / second;
    default:
      return second;
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value >= '0' && value <= '9') {
      inputDigit(value);
    } else if (value === '.') {
      inputDecimal();
    } else if (value === 'C') {
      clear();
    } else if (value === '±') {
      display.value = (-parseFloat(display.value)).toString();
    } else if (value === '%') {
      display.value = (parseFloat(display.value) / 100).toString();
    } else if (['+', '-', '×', '÷', '='].includes(value)) {
      handleOperator(value);
    }
  });
});

clear();
