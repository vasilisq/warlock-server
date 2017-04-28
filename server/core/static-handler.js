module.exports = function (request, response) {
    let fs = require('fs');

    let fileResponse = (filename) => {
        fs.readFile(__dirname + '/../../' + filename, (error, data) => {
            if (error) {
                response.writeHead(404);
                response.end('Not found');

                return;
            }

            response.writeHead(200);
            response.end(data);
        });
    };

    switch (request.url) {
        case '/':
            return fileResponse('index.html');
            break;
        case '/favicon.ico':
            return fileResponse('static/favicon.ico');
        default:
            // Match build directory
            if (request.url.match(new RegExp(/^\/build\/(.*)+/g))) {
                return fileResponse('.' + request.url);
            } else {
                response.writeHead(404);
                response.end('Not found');
            }
            break;
    }
};