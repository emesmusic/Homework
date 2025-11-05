'use strict';




(function () {

    const bodyElements = document.querySelectorAll('.body-element');
    let currentDraggingItem;
    let zIndex = 0;

    let audioPlayed = false;





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

    if (localStorage.bodyElements) {
        JSON.parse(localStorage.bodyElements).forEach(
            (element, index) => {
                bodyElements[index].style.top = element.top;
                bodyElements[index].style.left = element.left;
            }
        );
    }


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

    document.body.addEventListener('mousemove', (e) => {
        e.preventDefault();
        if (!audioPlayed) {
            document.getElementById('audio').play();
        }
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