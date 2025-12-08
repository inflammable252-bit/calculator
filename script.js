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
let display = document.querySelector("p.display")
let screenToDisplay = display.textContent

let keys = document.querySelectorAll(".numkey")
let util = document.querySelectorAll("#util")
let op = document.querySelectorAll("#op")
let minusKey = document.querySelector("#negative")

let a = ""
let b = ""
let operator = ""

function updateScreen() {
    screenToDisplay = `${a}${operator}${b}`
    display.textContent = screenToDisplay
}

function clearScreen() {
    a = ""
    b = ""
    operator = ""
}

function typeToScreen(item) {
    if (operator === "") {
    a += item.textContent
    }
    else if (operator != "") {
    b += item.textContent
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
        if (operator !== "" && b !== "") {
            a = operate(operator)
            b = ""
            operator = key.textContent
        }
        else if (key.textContent === "xy") {
            operator = "^";
        }
        else if (a!== "") {
            operator = key.textContent
        }
        updateScreen()
    })
})

util.forEach((key) => {
    key.addEventListener("click", () => {
        switch (key.textContent) {
            case "C":
                clearScreen()
                break;
            case "DEL":
                if (operator === "" && b === "") {
                aString = a.toString();
                a = aString;    
                a = a.slice(0, (a.length - 1))
                }
                else if (b === "" && operator !== "") {
                    operator = ""
                }
                else if (operator !== "") {
                b = b.slice(0, (b.length - 1))
                }
                break;
            case "=":
                if (a !== "" && operator !== "" && b !== "") {
                    a = operate(operator)
                    b = ""
                    operator = ""
                }
                break;
            }
        updateScreen()
    })
})

minusKey.addEventListener("click", () => {
    if (operator === "") {
    a = -a
    }
    else if (operator != "") {
    b = -b
    }
updateScreen()    
})
