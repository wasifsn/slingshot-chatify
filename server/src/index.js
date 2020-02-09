const express = require("express");
const app = express();
const socketio = require("socket.io");
const path = require("path");
const http = require("http");
const Filter = require("bad-words");
const messages = require("./utils/messages");

// new instance of class "Messages" from messages.js
const messagesClass = new messages();

const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

let count = 0;

io.on("connection", socket => {
  console.log("new Web socket connection");

  socket.emit("countUpdated", count);

  socket.on("increment", () => {
    count++;
    io.emit("countUpdated", count);
  });

  socket.broadcast.emit(
    "new_joinee",
    messagesClass.generateMessage(" New Person have joined the chat room")
  );

  socket.emit(
    "welcome_msg",
    messagesClass.generateMessage("Welcome To Chatify App")
  );

  socket.on("new_msg", (msg, callback) => {
    const filter = new Filter();
    if (filter.isProfane(msg)) {
      return callback("The message was not delivered sucessfully");
    }
    io.emit("broadcast_msg", messagesClass.generateMessage(msg));
    callback();
  });

  socket.on("disconnect", callback => {
    // callback("person left");
    io.emit("disconnectMessage", "A Person have left the Chat Room");
  });

  socket.on("sendLocation", (data, callback) => {
    if (data) {
      callback(messagesClass.generateUrl(data));
    }
    io.emit("LocationUser", data);
  });

  socket.on("join", ({ name, room }) => {
    console.log(name, room);
  });
});

server.listen(port, () => {
  console.log(`We are connected to port:${port}`);
});
