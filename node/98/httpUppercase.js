const http = require('http');

const server = http.createServer(
    (req, res) => {
        req.on('data', (data) => {
            res.write(data.toString().toUpperCase());
        })
        req.on('end', () => res.end())
    }
).listen(process.argv[2]);