let currentValue = "";
let firstNumber = "";
let operator = "";

function addNumber(number) {
    if (number === "." && currentValue.includes(".")) {
        return;
    }

    if (currentValue === "0" && number !== ".") {
        currentValue = "";
    }

    currentValue += number;
    updateDisplay(currentValue);
}

function chooseOperator(selectedOperator) {
    if (currentValue === "" && firstNumber === "") {
        return;
    }

    if (firstNumber !== "" && currentValue !== "") {
        calculate();
    }

    firstNumber = currentValue;
    operator = selectedOperator;
    currentValue = "";
}

function calculate() {
    if (firstNumber === "" || currentValue === "" || operator === "") {
        return;
    }

    let number1 = Number(firstNumber);
    let number2 = Number(currentValue);
    let result;

    if (operator === "+") {
        result = number1 + number2;
    } else if (operator === "-") {
        result = number1 - number2;
    } else if (operator === "*") {
        result = number1 * number2;
    } else if (operator === "/") {
        if (number2 === 0) {
            updateDisplay("Cannot divide by 0");
            resetCalculator();
            return;
        }
        result = number1 / number2;
    } else if (operator === "%") {
        result = number1 % number2;
    }

    currentValue = String(result);
    firstNumber = "";
    operator = "";
    updateDisplay(currentValue);
}

function clearDisplay() {
    resetCalculator();
    updateDisplay("0");
}

function deleteLast() {
    currentValue = currentValue.slice(0, -1);

    if (currentValue === "") {
        updateDisplay("0");
    } else {
        updateDisplay(currentValue);
    }
}

function resetCalculator() {
    currentValue = "";
    firstNumber = "";
    operator = "";
}

function updateDisplay(value) {
    document.getElementById("display").value = value;
}

document.addEventListener("keydown", function(event) {
    const key = event.key;

    if ((key >= "0" && key <= "9") || key === ".") {
        addNumber(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/" || key === "%") {
        chooseOperator(key);
    } else if (key === "Enter" || key === "=") {
        calculate();
    } else if (key === "Escape") {
        clearDisplay();
    } else if (key === "Backspace") {
        deleteLast();
    }
});
