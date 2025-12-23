let a = ""
let b = ""
let operator = ""
let aIsResult = false
let errorMsg = "💥💥💥" + "ERROR" + "💥💥💥"

let aTruncated = ""

let displayText = document.querySelector("p.display")
let screenToDisplay = displayText.textContent

let keys = document.querySelectorAll(".numkey")
let decimalKey = document.querySelector(".float")
let util = document.querySelectorAll("#util")
let op = document.querySelectorAll("#op")
let minusKey = document.querySelector("#negative")

let screen = document.querySelector("div.screen")
let solarPanel = document.querySelector("div#solar-panel")

solarPanel.addEventListener("mouseenter", () => {
    displayText.style.opacity = 0.35
})
solarPanel.addEventListener("mouseout", () => {
    displayText.style.opacity = 1
})

//Log
const logList = document.querySelector(".log-list")

function addToLog() {
    const listItem = document.createElement("li")
    listItem.textContent = `${aPrevious}${opPrevious}${bPrevious} = ${a}`
    logList.appendChild(listItem)
    listItems = document.querySelectorAll(".log-list li")
    if (listItems.length > 15) {
    logList.removeChild(listItems[0])
    }
}

const clearLogButton = document.querySelector("button#clear-log")

clearLogButton.addEventListener("click", () => {
    let itemsToDelete = document.querySelectorAll(".log-list > li")
    itemsToDelete.forEach((item) => {
        logList.removeChild(item)
    })
})

//Operations

const add = function (a, b) {
    return a + b;
}
const subtract = function (a, b) {
    return a - b;
}

const multiply = function (a, b) {
    return a * b
}

const divide = function (a, b) {
    if (b==0) {
        return errorMsg;
    }
    else return a / b
}

const power = function (a, b) {
    return a ** b
}

function operate(operator) {
    aIsResult = true
    aPrevious = a
    bPrevious = b
    opPrevious = operator
    a = parseFloat(a)
    b = parseFloat(b)
    switch (operator) {
        case "+":
            return (add(a,b))
        case "-":
            return subtract(a,b)
        case "*":
        case "x":
            return multiply(a,b)
        case "÷":
        case "/":
            return divide(a,b)
        case "^":
           return power(a,b)
    }
}

//Input helpers
function updateScreen() {
    screenToDisplay = `${a}${operator}${b}`
    truncate()
    if (screenToDisplay == "NaN") {
        displayText.textContent = errorMsg;
        return
    }
    displayText.textContent = screenToDisplay
}

function truncate() {
    if (a.toString().length > 10) {
        aTruncated = parseFloat(a).toPrecision(10)
        screenToDisplay = `${aTruncated}${operator}${b}`
    }
}

function clearScreen() {
    a = ""
    b = ""
    operator = ""
    aIsResult = false
}

function enterInput(key) {
    if (aIsResult == true && operator == "" || screenToDisplay == errorMsg) {
        clearScreen()
    }
numkeyToScreen(key)
aIsResult = false
}

function numkeyToScreen(item) {
    if (operator === "") {
    a += item.textContent || item.key
    }
    else if (operator != "") {
    b += item.textContent || item.key
    }
updateScreen()
}

function decimalToScreen() {
    if (operator === "" && !a.toString().includes(".")) {
        if (a == "" || aIsResult == true) {
        a = "0"
        }
    a += "."
    }
    else if (operator != "" && !b.toString().includes(".")) {
        if (b == "") {
            b = "0"
        }
    b += "."
    }
updateScreen()
aIsResult = false;
}

function enterOperator(item) {
    if (operator !== "" && b !== "") {
        a = operate(operator)
        b = ""
        addToLog()
        if (item.textContent === "xy") {
            operator = "^"
        }
        else 
        operator = item.textContent || item.key
    }
    else if (item.textContent === "xy" && a != errorMsg) {
        operator = "^";
    }
    else if (a != "" && a != errorMsg) {
        operator = item.textContent || item.key
    }
updateScreen()
}

function enterUtil(item) {
        switch (item.textContent || item.key) {
            case "C":
                clearScreen()
                break;
            case "D":
            case "DEL":
                if (a == errorMsg) {
                    break;
                }
                if (operator === "" && b === "") {
                aString = a.toString();
                a = aString;    
                a = a.slice(0, (a.length - 1))
                }
                else if (b === "" && operator !== "") {
                    operator = ""
                }
                else if (operator !== "") {
                bString = b.toString();
                b = bString;
                b = b.slice(0, (b.length - 1))
                }
                break;
            case "Enter":
                if (item.shiftKey == false) {
                    event.preventDefault()
                    break;
                }
            case "=":
                if (a !== "" && operator !== "" && b !== "") {
                    a = operate(operator)
                    b = ""
                    operator = ""
                    addToLog()
                }
                event.preventDefault()
                break;
            case "_":
                togglePosOrNegative()
            }
        updateScreen()
}

// Input

let aPrevious = ""
let bPrevious = ""

keys.forEach((key) => {
    key.addEventListener("click", () => enterInput(key))
})

decimalKey.addEventListener("click", () => {
    decimalToScreen()
})

op.forEach((key) => {
    key.addEventListener("click", () => enterOperator(key))
})

document.addEventListener("keydown", (event) => {
    const validOperators = "+-*/^"
    if (validOperators.includes(event.key)) {
        enterOperator(event)
        }
    if (event.key == ".") {
        decimalToScreen()
    }
    if (!isNaN(event.key)) {
    enterInput(event)
        }
    enterUtil(event)
})

util.forEach((key) => {
    key.addEventListener("click", () => enterUtil(key))
})

function togglePosOrNegative() {
    if (operator === "" && a != "" && a != errorMsg) {
    a = -a
    }
    if (operator != "" && b != "") {
    b = -b
    }
updateScreen()    
}

minusKey.addEventListener("click", () => togglePosOrNegative())