'use strict';
(function () {


    const context = document.getElementById('theCanvas').getContext('2d');
    const APPLE_AND_SNAKE_WIDTH = 64;
    resizeCanvas();
    let paused = false;
    let speed = 500;
    
    const pause = document.createElement('img');
    pause.src = 'pause.png';
    pause.style.position = 'absolute';
    pause.style.top = '10rem';
    pause.style.left = '10rem';
    pause.style.display = 'none';
    document.body.appendChild(pause);

    let currentlyRunningGameLoop;
    let direction = 'ArrowDown';

    window.addEventListener('resize', resizeCanvas);

    const snakeImgDown = document.createElement('img');
    snakeImgDown.src = 'snakeHeadDown.png';
    const snakeImgUp = document.createElement('img');
    snakeImgUp.src = 'snakeHeadUp.png';
    const snakeImgLeft = document.createElement('img');
    snakeImgLeft.src = 'snakeHeadLeft.png';
    const snakeImgRight = document.createElement('img');
    snakeImgRight.src = 'snakeHeadRight.png';

    const snake = { img: snakeImgDown };
    const apple = {img: document.createElement('img')};
    apple.img.src = 'apple.png';


    snake.x = context.canvas.width / 2 - APPLE_AND_SNAKE_WIDTH / 2;
    snake.y = context.canvas.height / 2 - APPLE_AND_SNAKE_WIDTH / 2;
    snake.img.addEventListener('load', () => {
        moveApple();
        draw(snake);
        draw(apple);
        currentlyRunningGameLoop = setTimeout(gameLoop, speed);
    });



    document.addEventListener('keydown', (event) => { console.log(event); });




    document.addEventListener('keydown', (event) => {
        if(paused) return;
        switch (event.code) {
            case 'ArrowUp':
                if (direction === 'ArrowUp' || direction === 'ArrowDown' || snake.img === snakeImgDown) return;
                else {
                    direction = 'ArrowUp';
                    //snake.snakeImg = snakeImgUp;
                }
                return;
            case 'ArrowDown':
                if (direction === 'ArrowDown' || direction === 'ArrowUp' || snake.img === snakeImgUp) return;
                else {
                    direction = 'ArrowDown';
                    //snake.snakeImg = snakeImgDown;
                }
                return;
            case 'ArrowLeft':
                if (direction === 'ArrowLeft' || direction === 'ArrowRight' || snake.img === snakeImgRight) return;
                else {
                    direction = 'ArrowLeft';
                    //snake.snakeImg = snakeImgLeft;
                }
                return;
            case 'ArrowRight':
                if (direction === 'ArrowRight' || direction === 'ArrowLeft' || snake.img === snakeImgLeft) return;
                else {
                    direction = 'ArrowRight';
                    //snake.snakeImg = snakeImgRight;
                }
                return;
            default:
                return;
        }
    });

    function moveApple(){
        // apple.x = Math.floor(Math.random() * (context.canvas.width / SNAKE_WIDTH)) * SNAKE_WIDTH;
        // apple.y = Math.floor(Math.random() * (context.canvas.height / SNAKE_WIDTH)) * SNAKE_WIDTH;
       apple.x = Math.floor(Math.random() * (context.canvas.width / APPLE_AND_SNAKE_WIDTH)) * APPLE_AND_SNAKE_WIDTH;
       apple.y = Math.floor(Math.random() * (context.canvas.height / APPLE_AND_SNAKE_WIDTH)) * APPLE_AND_SNAKE_WIDTH;
    }


    function moveSnake() {
        switch (direction) {
            case 'ArrowUp':
                snake.y -= APPLE_AND_SNAKE_WIDTH;
                if (snake.y < 0) snake.y = context.canvas.height - APPLE_AND_SNAKE_WIDTH;
                snake.img = snakeImgUp;
                return;
            case 'ArrowDown':
                snake.y += APPLE_AND_SNAKE_WIDTH;
                if (snake.y >= context.canvas.height) snake.y = 0;
                snake.img = snakeImgDown;
                return;
            case 'ArrowLeft':
                snake.x -= APPLE_AND_SNAKE_WIDTH;
                if (snake.x < 0) snake.x = context.canvas.width - APPLE_AND_SNAKE_WIDTH;
                snake.img = snakeImgLeft;
                return;
            case 'ArrowRight':
                snake.x += APPLE_AND_SNAKE_WIDTH;
                if (snake.x >= context.canvas.width) snake.x = 0;
                snake.img = snakeImgRight;
                return;
        }
    }

window.addEventListener('keydown', (event) => {
if (event.code === 'Space') {
    if(paused){
        currentlyRunningGameLoop = setTimeout(gameLoop, speed);
        pause.style.display = 'none';
    }
    else{
        clearTimeout(currentlyRunningGameLoop);
        pause.style.display = 'block';
    }
    paused = !paused;


}});

    function gameLoop() {

        moveSnake();
        clearCanvas();
        draw(snake);
        draw(apple);

        currentlyRunningGameLoop = setTimeout(gameLoop, speed);
    }
    function draw(item) {
        context.drawImage(item.img, item.x, item.y);
    }



    function clearCanvas() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    function resizeCanvas() {
        context.canvas.width = window.innerWidth - (window.innerWidth % APPLE_AND_SNAKE_WIDTH);
        context.canvas.height = window.innerHeight - (window.innerHeight % APPLE_AND_SNAKE_WIDTH);
    }









})();