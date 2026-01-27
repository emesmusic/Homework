const fs = require('fs');


fs.readdir(process.argv[2], (err, list) =>{
  
list.filter(file => file.endsWith('.' + process.argv[3])).forEach(file => console.log(file));
    


})