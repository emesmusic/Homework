'use strict';

(function () {

    const contentDiv = document.getElementById('content');


    const canvas = document.getElementById('theCanvas');
    canvas.width = contentDiv.clientWidth;
    canvas.height = contentDiv.clientHeight;
    const context = canvas.getContext('2d');
    let balls = [];
    let ballTails = false;
    const ballTailsButton = document.getElementById('ballTails');

    window.addEventListener('resize', () => {
        canvas.width = contentDiv.clientWidth;
        canvas.height = contentDiv.clientHeight;
    });

    ballTailsButton.addEventListener('click', () => {
        ballTails = !ballTails;
        ballTailsButton.textContent = ballTails ? "On" : "Off";
        ballTailsButton.style.backgroundColor = ballTails ? "green" : "red";
    });
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const ball = new Ball(document.getElementById('colorPicker').value, Number(document.getElementById('radiusPicker').value), context, 100, 100);
        balls.push(ball);

    });

    document.getElementById('clearBalls').addEventListener('click', () => {
        balls = [];
    });

    setInterval(() => {
        clear();
        balls.forEach(ball => ball.draw());
    }, 10);


    function clear() {
        if (!ballTails) {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    class Ball {

        constructor(color, radius, context, x, y, dx = 4, dy = 4, interval = 5) {
            this.color = color;
            this.radius = radius;
            this.context = context;
            this.x = (Math.random() * (canvas.width - (radius * 2))) + radius;
            this.y = (Math.random() * (canvas.height - (radius * 2))) + radius;
            this.dx = Math.random() < 0.5 ? dx : -dx;
            this.dy = Math.random() < 0.5 ? dy : -dy;
            this.interval = interval;
        }

        draw() {

            this.context.beginPath();
            this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            this.context.fillStyle = this.color;
            this.context.fill();
            this.context.closePath();
            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                this.dx = -this.dx;

            }
            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                this.dy = -this.dy;

            }

            this.x += this.dx;
            this.y += this.dy;


        }


    }




})();