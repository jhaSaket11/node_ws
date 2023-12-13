const { WebSocketServer } = require('ws');
const http = require('http');
const os = require("os");

// get host name
const hostName = os.hostname();

// Spinning the http server and the WebSocket server.
const server = http.createServer();
const wss = new WebSocketServer({ server });
const port = 8080;
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    ws.send(`Server received your message: ${message} on host ${hostName}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
