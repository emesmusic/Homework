'use strict';




(function () {

    const bodyElements = document.querySelectorAll('.body-element');
    let currentDraggingItem;
    let zIndex;
    let potatoZIndex;
    let audioPlayed = false;
    const audioImage = document.getElementById('audio-image');
    let createdBodyElements = [];

    loadState();

    document.body.addEventListener('click', () => {
        if (!audioPlayed) {
            document.getElementById('audio').play();
            audioPlayed = true;
            audioImage.src = 'media/speaker-icon.jpg';
        }
    });



    bodyElements.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(e);
            if (!currentDraggingItem) {
                createBodyElement(element.src, element.className, e);
            }


        });
    });



    document.body.addEventListener('mousemove', (e) => {
        e.preventDefault();
        if (currentDraggingItem) {
            currentDraggingItem.style.top = (e.clientY - currentDraggingItem.offsetY) + 'px';
            currentDraggingItem.style.left = (e.clientX - currentDraggingItem.offsetX) + 'px';

        }


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





    function createBodyElement(src, className, e) {

        const newBodyElement = document.createElement('img');
        newBodyElement.src = src;
        newBodyElement.className = className;
        newBodyElement.style.position = 'absolute';
        if (e) {
            newBodyElement.style.top = (e.clientY - e.offsetY) + 'px';
            newBodyElement.style.left = (e.clientX - e.offsetX) + 'px';
            newBodyElement.offsetY = e.offsetY;
            newBodyElement.offsetX = e.offsetX;
        }
        if (className.includes('potato')) {
            newBodyElement.style.zIndex = ++potatoZIndex;
        } else {
            newBodyElement.style.zIndex = ++zIndex;
        }
        newBodyElement.addEventListener('click', (e) => {
            e.preventDefault();
            className.includes('potato') ? newBodyElement.style.zIndex = ++potatoZIndex : newBodyElement.style.zIndex = ++zIndex;
            newBodyElement.offsetY = e.offsetY;
            newBodyElement.offsetX = e.offsetX;

            if (!currentDraggingItem) {
                currentDraggingItem = newBodyElement;
            }
            else {
                currentDraggingItem = null;
                saveState();
            }
        });
        if (e) {
            currentDraggingItem = newBodyElement;
        }
        document.body.appendChild(newBodyElement);
        createdBodyElements.push(newBodyElement);
        return newBodyElement;
    }

    function saveState() {


        localStorage.bodyElements = JSON.stringify(createdBodyElements.map(element => ({
            src: element.src,
            className: element.className,
            top: element.style.top,
            left: element.style.left
        })));
        localStorage.zIndex = zIndex;
        localStorage.potatoZIndex = potatoZIndex;


    };



    function loadState() {

        zIndex = localStorage.zIndex || 999999;
        potatoZIndex = localStorage.potatoZIndex || 0;


        if (localStorage.bodyElements) {
            JSON.parse(localStorage.bodyElements).forEach(
                element => {
                    const newBodyElement = createBodyElement(element.src, element.className);
                    newBodyElement.style.top = element.top;
                    newBodyElement.style.left = element.left;

                }
            );
        }

    }


})();