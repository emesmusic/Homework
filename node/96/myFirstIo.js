const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
let count = 0;
let index = data.indexOf('\n');
while (index !== -1){
    count++;
    index = data.indexOf('\n', index + 1);
}
console.log(count);