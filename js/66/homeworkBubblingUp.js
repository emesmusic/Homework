'use strict';

(function () {

    let buttonCounter = 1;

    document.getElementById('buttonContainer').addEventListener('click', buttonCreator);
    
    function buttonCreator() {
        const newButton = document.createElement('button');
        newButton.textContent = `${++buttonCounter}`;
        document.getElementById('buttonContainer').appendChild(newButton);
        
    }


}());









