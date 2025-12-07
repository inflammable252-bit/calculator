const add = function (a, b) {
    return parseFloat(a) + parseFloat(b)
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

function operate(operator) {
    switch (operator) {
        case "+":
            return (add(a,b))
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

let typeMode = "left"

let screen = document.querySelector(".screen")
let screenToDisplay = screen.textContent

let keys = document.querySelectorAll(".numkey")

let operators = document.querySelectorAll("#op")

let float = document.querySelector("#float")
let util = document.querySelectorAll("#util")
let op = document.querySelectorAll("#op")

let operatorString = "+-x=-÷"

let a = ""
let b = ""
let operator = ""

function updateScreen() {
    screenToDisplay = `${a}${operator}${b}`
    screen.textContent = screenToDisplay
}

function clearScreen() {
    a = ""
    b = ""
    updateScreen()
}

function typeToScreen(key) {
    if (!(key.textContent).includes(operatorString)) {
        operator = key.textContent
    }
    if (typeMode == "left") {
    a += key.textContent
    }
    if (typeMode == "right") {
    b += key.textContent
    }
updateScreen()
}

keys.forEach((key) => {
    key.addEventListener("click", () => {
        typeToScreen(key)
        })
})

op.forEach((key) => {
    key.addEventListener("click", () => {
        if (typeMode == "left") {
            typeMode = "right"
        }
        else {
            typeMode = "left"
        }
        if (screenToDisplay.includes(operatorString)) {
            result = operate(a,b)
            a = result
            b = ""
            updateScreen()
        }
        else {
            typeToScreen()
        }

    })
})

util.forEach((key) => {
    key.addEventListener("click", () => {
        switch (key.textContent) {
            case "C":
                clearScreen()
            case "DEL":
                if (typeMode  = "left") {
                a = a.slice(0, (a.length - 1))
                }
                else {
                b = b.slice(0, (b.length - 1))
                }
            }
        updateScreen()
    })
})
