const http = require('http');

const server = http.createServer(
    (req, res) => {
        const url = new URL(req.url, 'http://localhost')
        switch (url.pathname) {
            case '/api/parsetime':
            case '/api/unixtime':
                const iso = url.searchParams.get('iso');
                if (!iso) {
                    res.writeHead(404, {
                        'content-type': 'text/html'
                    })
                    res.end('<h1> 404 - Not found')
                    break;
                }
                const date = new Date(iso);
                res.setHeader('content-type', 'application/json');
                if (url.pathname === '/api/parsetime') {
                    res.end(`{"hour":${date.getHours()},"minute":${date.getMinutes()},"second":${date.getSeconds()}
                    }`);

                }
                if (url.pathname === '/api/unixtime') {
                    res.end(`{"unixtime":${date.getTime()}}`);
                }
                break;


            default:
                res.writeHead(404, {
                    'content-type': 'text/html'
                })
                res.end('<h1> 404 - Not found')



        }




    }




).listen(process.argv[2]);