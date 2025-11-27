'use strict';


function Vehicle(color) {
    this.color = color;
}

Vehicle.prototype.go = function (speed) {
    this.speed = speed;
    console.log(`Now going at speed: ${this.speed}`);
};
Vehicle.prototype.print = function () {
    console.log('Color: ' + this.color + ', Speed: ' + this.speed);
};

function Plane(color) {
    Vehicle.call(this, color);
};
Plane.prototype = Object.create(Vehicle.prototype);
Plane.prototype.constructor = Plane;
Plane.prototype.go = function (speed) {
    this.speed = speed;
    console.log(`Now flying at speed: ${this.speed}`);
};

const vehicle = new Vehicle('red');
vehicle.go(50);
vehicle.print();

const plane = new Plane('white');
plane.go(200);
plane.print();