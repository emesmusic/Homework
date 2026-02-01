'use strict';
const http = require('http');
let completeData = '';
http.get(process.argv[2], 'utf-8', (response) => {
    response.on('data', (data) => {
        completeData += data;
    })
    response.on('end', () => {
        console.log(completeData.length);
        console.log(completeData);
    })

})