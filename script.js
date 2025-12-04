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

function operate(a, operator, b) {
    switch (operator) {
        case "+":
            return add(a,b)
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
console.log(operate(5,"+",1))