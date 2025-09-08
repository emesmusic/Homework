'use strict';

(function(){
let buttonCounter = 1;

document.getElementById('firstButton').addEventListener('click', buttonCreator);

function buttonCreator () {
    const newButton = document.createElement('button');
    newButton.textContent = `${++buttonCounter}`;
    newButton.addEventListener('click', buttonCreator);
    document.body.appendChild(newButton);
}


}());









