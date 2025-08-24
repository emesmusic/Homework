'use strict';



//1
function every(array, predicate) {
    for (let item of array) {
        if (!predicate(item)) {
            return false;
        }
    }
    return true;
}

let letters = ['a', 'B', 'c', 'D', 'e'];

console.log(every(letters, x => x === x.toUpperCase()));

console.log(every(letters, x => x === x.toLowerCase()));

console.log(letters.every(x => x === x.toUpperCase()));

console.log(letters.every(x => x === x.toLowerCase()));



//2
function some(array, predicate) {
    for (let item of array){
        if (predicate(item)){
            return true;
        }
    }
    return false;
}

console.log(some(letters, x => x === x.toUpperCase()));

console.log(some(letters, x => x === x.toLowerCase()));

console.log(letters.some(x => x === x.toUpperCase()));

console.log(letters.some(x => x ===  x.toLowerCase()));


//3
function onlyIf(array, test, action) {
    for (let item of array) {
        if (test(item)) {
            action(item);
        }
    }
}



//4
function betterOnlyIf(array, test, action) {
    array.filter(test).forEach(action);
}