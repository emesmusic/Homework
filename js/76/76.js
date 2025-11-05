'use strict';




(function () {

    const bodyElements = document.querySelectorAll('.body-element');
    let currentDraggingItem;
    let zIndex = 0;
    let audioPlayed = false;
    const audioImage = document.getElementById('audio-image');






    if (localStorage.bodyElements) {
        JSON.parse(localStorage.bodyElements).forEach(
            element => {
                document.getElementById(element.id).style.top = element.top;
                document.getElementById(element.id).style.left = element.left;
            }
        );
    }
    else {
        let top = 0;
        let left = 5;
        bodyElements.forEach(element => {

            element.style.top = `${top}%`;
            element.style.left = `${left}%`;

            left += 15;
            if (left > 80) {
                left = 10;
                top += 10;
            }
        });
    }


document.body.addEventListener('click', () => {
    if (!audioPlayed) {
        document.getElementById('audio').play();
        audioPlayed = true;
        audioImage.src = 'media/speaker-icon.jpg';
    }
});

    bodyElements.forEach(element => {

        element.addEventListener('mousedown', (e) => {
            e.preventDefault();
            currentDraggingItem = element;
            currentDraggingItem.offsetY = e.offsetY;
            currentDraggingItem.offsetX = e.offsetX;
            currentDraggingItem.style.zIndex = ++zIndex;

            console.log(e);
        });
        element.addEventListener('mouseup', (e) => {
            e.preventDefault();
            currentDraggingItem = null;
        });

    });

    audioImage.addEventListener('click', () => {

        if (audioImage.src.includes('media/speaker-icon.jpg')) {
            audioImage.src = 'media/mute-speaker-icon.jpg';
            document.getElementById('audio').pause();
        }
        else {
            audioImage.src = 'media/speaker-icon.jpg';
            document.getElementById('audio').play();
        }


    });

    document.body.addEventListener('mousemove', (e) => {
        e.preventDefault();
        if (currentDraggingItem) {

            currentDraggingItem.style.top = (e.clientY - currentDraggingItem.offsetY) + 'px';
            currentDraggingItem.style.left = (e.clientX - currentDraggingItem.offsetX) + 'px';

            localStorage.bodyElements = JSON.stringify(
                [...bodyElements].map(element => ({
                    id: element.id,
                    top: element.style.top,
                    left: element.style.left
                }))
            );



        }
    });







})();