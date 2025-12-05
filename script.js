const add = function (a, b) {
    return a + b;
};
const subtract = function (a, b) {
    return a - b;
}

const multiply = function (a, b) {
    return a * b
}

const divide = function (a, b) {
    if (b==0) return "💥💥💥" + "ERROR" + "💥💥💥"
    else return a / b
}

const power = function (a, b) {
    return a ** b
}

function operate(string, operator) {
    let operatorIndex = string.indexOf(operator)
    a = string.slice(0, operatorIndex)
    b = string.slice(operatorIndex)
    switch (operator) {
        case "+":
            screenText = add(a,b)
        case "-":
            return subtract(a,b)
        case "x":
            return multiply(a,b)
        case "÷":
            return divide(a,b)
        case "^":
           return power(a,b)
    }
}

let screen = document.querySelector(".screen")
let screenText = ""
let keys = document.querySelectorAll(".numkey")
let float = document.querySelector("#float")

let operators = document.querySelectorAll("#op")
let util = document.querySelectorAll("#util")

function updateScreen(key) {
    screenText += key.textContent
    screen.textContent = screenText
}

function clearScreen() {
    screenText = ""
    screen.textContent = ""
}

keys.forEach((key) => {
    key.addEventListener("click", () => {
        updateScreen(key)

    })
})
// if ((screenText.charAt(screenText.length - 1 == ".") && (key == float))) {return}

operators.forEach((key) => {
    key.addEventListener("click", () => {
        updateScreen(key)

    })
})

util.forEach((key) => {
    key.addEventListener("click", () => {
        switch (key.textContent) {
            case "C":
                clearScreen()
            case "DEL":
                screenText = screenText.slice(0, (screenText.length - 1))
                screen.textContent = screenText
        }
    })
})
