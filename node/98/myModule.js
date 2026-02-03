const fs = require('fs');

module.exports = (directory, extension, callback) => {
    fs.readdir(directory, (err, res) => {
        if(err){
            return callback(err);
        }
       const filtered = res.filter(item => item.endsWith('.' + extension));
       callback(null, filtered);

    })

}

