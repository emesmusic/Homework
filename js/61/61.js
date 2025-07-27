"use strict";

//a
let cToF = (celcius) => (celcius/5)*9+32;

let fToC = (fahrenheit) => ((fahrenheit-32)*5)/9;

console.log(cToF(30), cToF(20), fToC(86), fToC(68));

let userInput = prompt("Enter a temperature in Celcius to convert to Fahrenheit:");
alert(`The temperature in Fahrenheit is: ${cToF(userInput)}`);


//b
//1
function multiply (x, y) {
    return x * y;
}

console.log(multiply(5, 10), multiply(2, 3));

//2
function getMultiplier(){
    return function(x, y){
        return x * y;
    };
}

let gotMultiplier = getMultiplier();
console.log(gotMultiplier(5, 10), gotMultiplier(2, 3));

function getBetterMultiplier (x){
    return (y) => x * y;
}

let multiplyByFive = getBetterMultiplier(5);
console.log(multiplyByFive(10), multiplyByFive(100));