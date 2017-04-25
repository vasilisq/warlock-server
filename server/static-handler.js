module.exports = function (request, response) {
    let fs = require('fs');

    let fileResponse = (filename) => {
        fs.readFile(__dirname + '/../' + filename, (error, data) => {
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
        case '/build/build.js':
            return fileResponse('build/build.js');
        default:
            response.writeHead(404);
            response.end('Not found');
            break;
    }
};