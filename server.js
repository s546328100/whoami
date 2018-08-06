const http = require('http');
const os = require('os');

let port = process.argv[2] || 3001;

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    let result = {
        ipaddress: getClientIp(req),
        language: req.headers['accept-language'],
        software: req.headers['user-agent']
    };

    result.ipaddress = result.ipaddress.split(',')[0];
    result.language = result.language.split(',')[0];
    result.software = result.software.split(/\(([^)]+)\)/)[1];

    res.end(JSON.stringify(result));
}).listen(port, '0.0.0.0', () => {
    console.log('listen to port: %s', port);
});

function getClientIp(req) {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
}
