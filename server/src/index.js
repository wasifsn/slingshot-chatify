const express = require('express');
const app = express();
const socketio = require('socket.io');
const path = require('path');
const http = require('http');

const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

let count = 0;

io.on('connection', (socket) => {
	console.log('new Web socket connection');
	socket.emit('countUpdated', count);
	socket.on('increment', () => {
		count++;
		io.emit('countUpdated', count);
	});
});

server.listen(port, () => {
	console.log(`We are connected to port:${port}`);
});
