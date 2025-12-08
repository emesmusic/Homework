'use strict';
(function () {

    const contentDiv = document.getElementById('content-div');
    const scoreSpan = document.getElementById('score');
    const highScoreSpan = document.getElementById('high-score');
    const context = document.getElementById('theCanvas').getContext('2d');
    const APPLE_AND_SNAKE_WIDTH = 64;
    resizeCanvas();
    let paused = false;
    let speed = 500;
    gameOver.status = false;




    const pauseImage = document.createElement('img');
    pauseImage.src = 'pause.png';
    pauseImage.style.position = 'absolute';
    pauseImage.style.top = '10rem';
    pauseImage.style.left = '10rem';
    pauseImage.style.display = 'none';
    document.body.appendChild(pauseImage);

    const gameOverOverlay = document.createElement('div');
    gameOverOverlay.style = "background-color: white; border: 3px solid black; display: flex; flex-direction: column; align-items: center; justify-content: center; width:fit-content; padding: 10px;";
    gameOverOverlay.innerHTML = `<h1 style="margin: 0;">Game Over</h1>
        <h4 style="margin:0;">Press space to play again...</h4>`;
    gameOverOverlay.style.display = 'none';
    gameOverOverlay.style.position = 'absolute';
    document.body.appendChild(gameOverOverlay);
    gameOverOverlay.style.top = '50%';
    gameOverOverlay.style.left = '50%';


    let currentlyRunningGameLoop;
    let direction = 'ArrowDown';
    let previousDirection = direction;
    const snakeBody = [];
    let score = 0;
    let highScore = 0;

    window.addEventListener('resize', resizeCanvas);

    let snakeHeadDown;
    let snakeHeadUp;
    let snakeHeadLeft;
    let snakeHeadRight;
    let snakeBodyVertical;
    let snakeBodyHorizontal;
    let snakeBodyLeftDown;
    let snakeBodyLeftUp;
    let snakeBodyRightDown;
    let snakeBodyRightUp;

    let crunch;
    let crash;

    const snakeHead = {};
    snakeBody.push(snakeHead);
    const apple = {};



    snakeHead.x = Math.floor((context.canvas.width / 2) / APPLE_AND_SNAKE_WIDTH) * APPLE_AND_SNAKE_WIDTH;
    snakeHead.y = Math.floor((context.canvas.height / 2) / APPLE_AND_SNAKE_WIDTH) * APPLE_AND_SNAKE_WIDTH;

    (async function startGame() {
        [snakeHeadDown, snakeHeadUp, snakeHeadLeft, snakeHeadRight, snakeBodyVertical, snakeBodyHorizontal,
            snakeBodyLeftDown, snakeBodyLeftUp, snakeBodyRightDown, snakeBodyRightUp, apple.img, crunch, crash] = await Promise.all([


                loadImageSource('snakeHeadDown.png','img'),
                loadImageSource('snakeHeadUp.png', 'img'),
                loadImageSource('snakeHeadLeft.png','img'),
                loadImageSource('snakeHeadRight.png','img'),
                loadImageSource('snakeBodyVertical.png','img'),
                loadImageSource('snakeBodyHorizontal.png','img'),
                loadImageSource('snakeBodyLeftDown.png','img'),
                loadImageSource('snakeBodyLeftUp.png','img'),
                loadImageSource('snakeBodyRightDown.png','img'),
                loadImageSource('snakeBodyRightUp.png','img'),
                loadImageSource('apple.png','img'),
                loadAudioSource('crunch.mp3','audio'),
                loadAudioSource('crash.mp3','audio')


            ]);
        snakeHead.img = snakeHeadDown;


        moveApple();
        snakeBody.forEach(piece => draw(piece));
        draw(apple);
        currentlyRunningGameLoop = setTimeout(gameLoop, speed);

    })();




    document.addEventListener('keydown', (event) => { console.log(event); });




    document.addEventListener('keydown', (event) => {

        switch (event.code) {
            case 'ArrowUp':
                if (direction === 'ArrowUp' || direction === 'ArrowDown' || snakeHead.img === snakeHeadDown) return;
                else {

                    direction = 'ArrowUp';
                    //snake.snakeImg = snakeImgUp;
                }
                return;
            case 'ArrowDown':
                if (direction === 'ArrowDown' || direction === 'ArrowUp' || snakeHead.img === snakeHeadUp) return;
                else {

                    direction = 'ArrowDown';
                    //snake.snakeImg = snakeImgDown;
                }
                return;
            case 'ArrowLeft':
                if (direction === 'ArrowLeft' || direction === 'ArrowRight' || snakeHead.img === snakeHeadRight) return;
                else {

                    direction = 'ArrowLeft';
                    //snake.snakeImg = snakeImgLeft;
                }
                return;
            case 'ArrowRight':
                if (direction === 'ArrowRight' || direction === 'ArrowLeft' || snakeHead.img === snakeHeadLeft) return;
                else {

                    direction = 'ArrowRight';
                    //snake.snakeImg = snakeImgRight;
                }
                return;

            case 'Space':
                if (gameOver.status) {
                    gameOverOverlay.style.display = 'none';
                    restart();
                    return;
                }
                else {
                    pause();
                    return;
                }
            case 'KeyR':

                if (gameOver.status) {
                    gameOverOverlay.style.display = 'none';
                }
                else {
                    clearTimeout(currentlyRunningGameLoop);
                }
                restart();
                return;

            default:
                return;
        }
    });

    function moveApple() {
        while (true) {
            apple.x = Math.floor(Math.random() * (context.canvas.width / APPLE_AND_SNAKE_WIDTH)) * APPLE_AND_SNAKE_WIDTH;
            apple.y = Math.floor(Math.random() * (context.canvas.height / APPLE_AND_SNAKE_WIDTH)) * APPLE_AND_SNAKE_WIDTH;
            if (!(snakeBody.some(piece => piece.x === apple.x && piece.y === apple.y)))
                return;
        }
    }


    function moveSnake() {
        const snakeBodyPiece = new SnakePiece(snakeHead.x, snakeHead.y);
        snakeBody.splice(1, 0, snakeBodyPiece);

        switch (direction) {
            case 'ArrowUp':
                snakeHead.y -= APPLE_AND_SNAKE_WIDTH;
                if (snakeHead.y < 0) snakeHead.y = context.canvas.height - APPLE_AND_SNAKE_WIDTH;
                snakeHead.img = snakeHeadUp;
                previousDirection = direction;
                break;
            case 'ArrowDown':
                snakeHead.y += APPLE_AND_SNAKE_WIDTH;
                if (snakeHead.y >= context.canvas.height) snakeHead.y = 0;
                snakeHead.img = snakeHeadDown;
                previousDirection = direction;
                break;
            case 'ArrowLeft':
                snakeHead.x -= APPLE_AND_SNAKE_WIDTH;
                if (snakeHead.x < 0) snakeHead.x = context.canvas.width - APPLE_AND_SNAKE_WIDTH;
                snakeHead.img = snakeHeadLeft;
                previousDirection = direction;
                break;
            case 'ArrowRight':
                snakeHead.x += APPLE_AND_SNAKE_WIDTH;
                if (snakeHead.x >= context.canvas.width) snakeHead.x = 0;
                snakeHead.img = snakeHeadRight;
                previousDirection = direction;
                break;
        }

        if (snakeHead.x === apple.x && snakeHead.y === apple.y) {
            crunch.currentTime = 0;
            crunch.play();
            scoreSpan.innerText = ++score;
            if (score > highScore) {
                highScoreSpan.innerText = ++highScore;
            }
            speed *= 0.98;
            moveApple();


        }



        else {
            snakeBody.pop();
        }
        if ((snakeBody.some((piece, index) => (index > 3) && (piece.x === snakeHead.x && piece.y === snakeHead.y)))) {
            crash.currentTime = 0;
            crash.play();
            gameOver.status = true;
        }


    }

    function SnakePiece(x, y) {

        switch (true) {
            case ((direction === previousDirection) && (direction === 'ArrowUp' || direction === 'ArrowDown')):
                this.img = snakeBodyVertical;
                break;
            case ((direction === previousDirection) && (direction === 'ArrowLeft' || direction === 'ArrowRight')):
                this.img = snakeBodyHorizontal;
                break;
            case ((previousDirection === 'ArrowUp' && direction === 'ArrowRight') || (previousDirection === 'ArrowLeft' && direction === 'ArrowDown')):
                this.img = snakeBodyLeftDown;
                break;
            case ((previousDirection === 'ArrowUp' && direction === 'ArrowLeft') || (previousDirection === 'ArrowRight' && direction === 'ArrowDown')):
                this.img = snakeBodyRightDown;
                break;
            case ((previousDirection === 'ArrowDown' && direction === 'ArrowLeft') || (previousDirection === 'ArrowRight' && direction === 'ArrowUp')):
                this.img = snakeBodyRightUp;
                break;
            case ((previousDirection === 'ArrowDown' && direction === 'ArrowRight') || (previousDirection === 'ArrowLeft' && direction === 'ArrowUp')):
                this.img = snakeBodyLeftUp;
                break;
        }
        this.x = x;
        this.y = y;

    }

    pauseImage.addEventListener('click', pause);

    function gameLoop() {

        moveSnake();

        clearCanvas();
        snakeBody.forEach(piece => draw(piece));
        draw(apple);
        if (gameOver.status) {
            gameOver();
            return;
        }
        currentlyRunningGameLoop = setTimeout(gameLoop, speed);
    }
    function draw(item) {
        context.drawImage(item.img, item.x, item.y);
    }

    function pause() {
        if (paused) {
            currentlyRunningGameLoop = setTimeout(gameLoop, speed);
            pauseImage.style.display = 'none';
        }
        else {
            clearTimeout(currentlyRunningGameLoop);
            pauseImage.style.display = 'block';
        }
        paused = !paused;
        return;
    }

    function clearCanvas() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    function resizeCanvas() {
        context.canvas.width = contentDiv.clientWidth - (contentDiv.clientWidth % APPLE_AND_SNAKE_WIDTH);
        context.canvas.height = contentDiv.clientHeight - (contentDiv.clientHeight % APPLE_AND_SNAKE_WIDTH);
    }


    function restart() {
        //clearTimeout(currentlyRunningGameLoop);
        clearCanvas();
        snakeHead.x = Math.floor((context.canvas.width / 2) / APPLE_AND_SNAKE_WIDTH) * APPLE_AND_SNAKE_WIDTH;
        snakeHead.y = Math.floor((context.canvas.height / 2) / APPLE_AND_SNAKE_WIDTH) * APPLE_AND_SNAKE_WIDTH;
        score = 0;
        scoreSpan.innerText = 0;
        snakeBody.length = 1;
        direction = 'ArrowDown';
        previousDirection = direction;
        speed = 500;
        gameOver.status = false;
        snakeHead.img = snakeHeadDown;



        moveApple();
        snakeBody.forEach(piece => draw(piece));
        draw(apple);
        currentlyRunningGameLoop = setTimeout(gameLoop, speed);

    }


    function loadImageSource(src) {
        return new Promise((resolve, reject) => {
            const img = document.createElement('img');
            img.src = src;
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        });
    }

    function loadAudioSource(src) {
        return new Promise((resolve, reject) => {
            const audio = document.createElement('audio');
            audio.src = src;
            audio.load();
            audio.addEventListener('canplaythrough', () => resolve(audio)) ;
            audio.addEventListener('error', () => reject(new Error(`Failed to load audio: ${src}`)));
        });
    }


    function gameOver() {
        gameOverOverlay.style.display = 'block';

    }



})();