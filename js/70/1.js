'use strict';
(function() {

function map (array, callback) {
    let output = [];
for(let element of array){
    output.push(callback(element));
}
return output;
}



let array0 = [1,2,3];
let array1 = map(array0, (x) => x * 2);

console.log(array0);
console.log(array1);



})();