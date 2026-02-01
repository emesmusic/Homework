'use strict';
const http = require('http');
let completeData = [];
let completedCallbacks = [];
for (let i = 2; i < process.argv.length; i++) {
    completedCallbacks[i - 2] = false;
    http.get(process.argv[i], (response) => {
        response.setEncoding('utf-8');
        response.on('data', (data) => {
            completeData[i - 2] = completeData[i-2] ? completeData[i - 2] + data : data;
        })
        response.on('end', () => {
            completedCallbacks[i - 2] = true;
            if (completedCallbacks.every(callbackStatus => callbackStatus === true)) {
                completeData.forEach((data) => console.log(data))
            }
        })

    })
}


