const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
})

var position = {
    x: 200,
    y: 200
};
// socketio.origins('*:*')
// socketio.set('origins', '*:*');

io.on("connection", socket => {
    console.log("success");
    socket.emit("position", position);
    socket.on("move", data => {
        switch (data) {
            case 'right':
                position.x = position.x + 5;
                io.emit("position", position);
                break;
            case 'left':
                position.x = position.x - 5;
                io.emit("position", position);
                break;
            case 'up':
                position.y = position.y - 5;
                io.emit("position", position);
                break;
            case 'down':
                position.y = position.y + 5;
                io.emit("position", position);
                break;

        }
    })
})

server.listen(3000, () => {
    console.log("listening at :3000...");
})