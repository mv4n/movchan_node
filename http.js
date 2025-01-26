import http from 'http';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

let idClient = 0;

const server = http.createServer((req, res) => {
    console.log(req.url);
    switch (req.url) {
        case '/favicon.ico':
            res.end('no favicon');
            break;
        case '/':
            res.end('index');
            break;
            case '/contacts':
            res.end('contacts');
            break;
        default:
            res.end('404');
            break;

    }
    ++idClient;
    // res.end(`hello client id (${idClient})!`);
})

server.listen(3000, () => {
    console.log(`Server started on port 3000`);
})