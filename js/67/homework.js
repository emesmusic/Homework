"use strict";
(function () {

    const backColor = document.querySelector("#backColor");
    const textColor = document.querySelector("#textColor");
    const colorChangeHistoryTable = document.querySelector("#colorChangeHistoryTable");
    let colorChangeHistory = [];

    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();

        if (!colorChangeHistory.length) {
            colorChangeHistoryTable.deleteRow(1);
        }

        const newColor = {
            bColor: backColor.value,
            tColor: textColor.value,
            time: new Date().toLocaleTimeString()
        };

        colorChangeHistory.push(newColor);
        const newRow = colorChangeHistoryTable.insertRow();
        newRow.innerHTML = `<td>${newColor.tColor}</td><td>${newColor.bColor}</td><td>${newColor.time}</td>`;
        newRow.addEventListener('click', () => {
            document.body.style.backgroundColor = newColor.bColor;
            document.body.style.color = newColor.tColor;
        });
        document.body.style.backgroundColor = newColor.bColor;
        document.body.style.color = newColor.tColor;

    });





}());



