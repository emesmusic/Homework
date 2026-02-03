const filteredLs = require('./myModule');

filteredLs(process.argv[2], process.argv[3], (err, res) => {
    if (err === null) {
        res.forEach(element => {
            console.log(element);
        });
    }
    else {
        console.log(err);
    }
})