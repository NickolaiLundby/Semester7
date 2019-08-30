"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const fs_1 = __importDefault(require("fs"));
const port = process.env.PORT || 3000;
const sendErrorResponse = (res) => {
    res.writeHead(http_status_codes_1.default.NOT_FOUND, {
        'Content-Type': 'text/html'
    });
    res.write('<h1>File Not Found!</h1>'),
        res.end();
};
const customReadFile = (file_path, res) => {
    if (fs_1.default.existsSync(file_path)) {
        fs_1.default.readFile(file_path, (error, data) => {
            if (error) {
                console.log(error);
                sendErrorResponse(res);
                return;
            }
            res.write(data);
            res.end();
        });
    }
    else {
        sendErrorResponse(res);
    }
};
var server = http_1.default.createServer((req, res) => {
    let url = req.url;
    if (url.indexOf('.html') !== -1) {
        res.writeHead(http_status_codes_1.default.OK, {
            'Content-Type': 'text/html'
        });
        customReadFile(`./views${url}`, res);
    }
    else if (url.indexOf('.js') !== -1) {
        res.writeHead(http_status_codes_1.default.OK, {
            'Content-Type': 'text/javascript'
        });
        customReadFile(`./public/js${url}`, res);
    }
    else if (url.indexOf('.css') !== -1) {
        res.writeHead(http_status_codes_1.default.OK, {
            'Content-Type': 'text/css'
        });
        customReadFile(`./public/css${url}`, res);
    }
    else if (url.indexOf('.png') !== -1) {
        res.writeHead(http_status_codes_1.default.OK, {
            'Content-Type': 'image/png'
        });
        customReadFile(`./public/images${url}`, res);
    }
    else if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('Welcome to http nodejs');
        res.end();
    }
    else if (req.url == '/customer') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('Welcome to the customer page');
        res.end();
    }
    else {
        sendErrorResponse(res);
    }
});
server.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
//# sourceMappingURL=app.js.map