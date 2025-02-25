const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    let extname = path.extname(filePath);
    let contentType = 'text/html';

    if (extname === '.css') contentType = 'text/css';
    if (extname === '.js') contentType = 'text/javascript';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

const wss = new WebSocket.Server({ server });

const messages = [];

wss.on('connection', ws => {
    console.log('New client connected');

    ws.send(JSON.stringify({ type: 'history', messages }));

    ws.on('message', message => {
        const msgData = JSON.parse(message);
        if (msgData.type === 'message') {
            const newMessage = { //
                id: Date.now(),
                author: msgData.author,
                message: msgData.message,
                time: new Date().toLocaleTimeString(),
            };
            messages.push(newMessage);

            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'message', message: newMessage }));
                }
            });
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

server.listen(5000, () => console.log('Server is running on http://localhost:5000'));
