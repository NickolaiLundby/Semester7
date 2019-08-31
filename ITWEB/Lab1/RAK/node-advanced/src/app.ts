import http from 'http';
import httpStatus from 'http-status-codes';
import fs from 'fs';

const port = 3000;

const errorResponse = (res: http.ServerResponse) => {
    res.writeHead(httpStatus.NOT_FOUND, {
        'Content-Type': 'text/html'
    });
    res.write('<h1>File Not Found!</h1>'),
    res.end();
}

const customReadFile = (fp: fs.PathLike, res: http.ServerResponse) => {
    if (fs.existsSync(fp)){
        fs.readFile(fp, (err, data) => {
            if(err){
                console.log(err);
                errorResponse(res);
                return;
            }
            res.write(data);
            res.end();
        });
    } else {
        errorResponse(res);
    }
}

var server = http.createServer((request, response) => {console.log('Received incoming request.');
let url = request.url!;
if (url.indexOf('.html') !== -1){
    response.writeHead(httpStatus.OK, {
        'Content-Type': 'text/html'
    });
    customReadFile(`./views${url}`, response);
    } else if (url.indexOf('.js') !== -1) {
        response.writeHead(httpStatus.OK, {
            'Content-Type': 'text/javascript'
        });
        customReadFile(`./public/js${url}`, response);
    } else if (url.indexOf('.css') !== -1) {
        response.writeHead(httpStatus.OK, {
            'Content-Type': 'text/css'
        });
        customReadFile(`./public/css${url}`, response);
    } else if (url.indexOf('.png') !== -1) {
        response.writeHead(httpStatus.OK, {
            'Content-Type': 'image/png'
        });
        customReadFile(`./public/images${url}`, response);
    } else if (request.url == '/'){
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write('Welcome to http nodejs');
        response.end();
    } else if (request.url == '/customer'){
        response.writeHead(200, { 'Content-Type': 'text/plain'});
        response.write('Welcome to the customer page');
        response.end();
    } else {
        errorResponse(response);
    }

})



server.listen( port );
console.log( `The server has started and is listening on port number: ${port}` );