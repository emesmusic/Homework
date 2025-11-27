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


const vehiclePrototype = {
    go(speed) {
        this.speed = speed;
        console.log(`Now going at speed: ${this.speed}`);
    },
    print() {
        console.log('Color: ' + this.color + ', Speed: ' + this.speed);
    }
};

function createVehicle(color) {
const vehicle = Object.create(vehiclePrototype);
vehicle.color = color;
return vehicle;
}

function createPlane(color) {
    const plane = createVehicle(color);
    plane.go = function (speed) {
        this.speed = speed;
        console.log(`Now flying at speed: ${this.speed}`);
    };
    return plane;
}

const vehicle1 = createVehicle('blue');
vehicle1.go(60);
vehicle1.print();

const plane1 = createPlane('green');
plane1.go(300);
plane1.print();