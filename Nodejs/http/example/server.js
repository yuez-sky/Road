var http = require('http')

http.createServer(function(req, res) {
    res.writeHead(200, {'context-type': 'text/plain'})
    res.end('hello world\n')
}).listen(3000, '127.0.0.1')

console.log('server is running at http://127.0.0.1:3000/')