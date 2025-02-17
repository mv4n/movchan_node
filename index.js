const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const messages = [];
let responses = [];
const users = [];

const server = http.createServer((req, res) => {
    const reqURL = url.parse(req.url, true);
    const pathname = reqURL.pathname;
    const searchParams = new URLSearchParams(reqURL.search);

    switch (pathname) {

        case '/':
            fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    res.writeHead(404);
                    res.end('error');
                }
                res.writeHead(200, {
                    'Content-Type': 'text/html',
                })
                res.end(data);
            })
            break
        case '/newMessage':
            const username = searchParams.get('username');
            let id = searchParams.get('id');
            const text = searchParams.get('text');

            if (id === 'null') {
                id = users.length ? +users.at(-1).id + 1 : 0;
            }
            users.push({ id: id });

            const newMessage = { username, text, id };
            if (username && text) {
                messages.push(newMessage);

                res.writeHead(200, { 'Content-Type': 'application/json' });

                const lastMessages = messages.slice(-20);
                res.end(JSON.stringify({ messages: lastMessages, id }));

                responses.forEach(r => {
                    r.writeHead(200, { 'Content-Type': 'application/json' });
                    r.end(JSON.stringify(lastMessages));
                });
                responses = [];
            }
            break;

        case '/getMessages':
            responses.push(res);
            break;

        case '/getMessagesLogin':
            res.writeHead(200, { 'Content-Type': 'application/json' });

            const lastMessagesLogin = messages.slice(-20);
            res.end(JSON.stringify(lastMessagesLogin));
            break;

        case '/style.css':
            fs.readFile(path.join(__dirname, 'style.css'), 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    res.writeHead(404);
                    res.end('error');
                }
                res.writeHead(200, {
                    'Content-Type': 'text/css',
                })
                res.end(data);
            })
            break
        case '/front.js':
            fs.readFile(path.join(__dirname, 'front.js'), 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    res.writeHead(404);
                    res.end('error');
                }
                res.writeHead(200, {
                    'Content-Type': 'text/javascript',
                })
                res.end(data);
            })
            break
        case '/favicon.ico':
            res.writeHead(404);
            res.end('no icon');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end("404");
    }

})


server.listen(5000, () => {})