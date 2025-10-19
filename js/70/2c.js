'use strict';

for(let i = 0; i < 10; i++) {
    window.app.counter.increment();
}
//or 
window.app.counter.reset().increment(10);


//I could've chained these if I would return 'this' while using a regular function instead of
//returning the new count but I think the most likely thing to chain onto an incrmenet is something
//that uses the new value of the counter
const counter0 = window.app.createCounter();
counter0.increment(5);
const counter1 = window.app.createCounter();
counter1.increment(15);


console.log(window.app.counter.getCount());
console.log(counter0.getCount());
console.log(counter1.getCount());