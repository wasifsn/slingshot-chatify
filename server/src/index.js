const express = require("express");
const app = express();
const socketio = require("socket.io");
const path = require("path");
const http = require("http");
const Filter = require("bad-words");
const messages = require("./utils/messages");
const {
  users,
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
} = require("./utils/users");

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
  // Events when a user joins a chat room
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) {
      return callback(error);
    } else {
      socket.join(user.room);
      io.to(user.room).emit(
        "welcome_msg",
        messagesClass.generateMessage("Welcome To Chatify App")
      );
      socket.broadcast
        .to(user.room)
        .emit(
          "new_joinee",
          messagesClass.generateMessage(
            `${user.name} have joined the chat room`
          )
        );
      io.to(user.room).emit("roomData", {
        room: user.room,
        roomData: getUsersInRoom(user.room)
      });
      callback();
    }
  });

  socket.emit("countUpdated", count);

  socket.on("increment", () => {
    count++;
    io.emit("countUpdated", count);
  });

  socket.on("new_msg", (msg, callback) => {
    const user = getUser(socket.id);
    console.log(user);
    console.log(socket.id);
    if (user) {
      const filter = new Filter();
      if (filter.isProfane(msg)) {
        return callback("The message was not delivered sucessfully");
      }
      socket
        .to(user.room)
        .emit("broadcast_msg", messagesClass.generateMessage(msg));
      callback();
    } else {
      callback("The message was not delivered sucessfully");
    }
  });

  socket.on("disconnect", callback => {
    // callback("person left");
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "disconnectMessage",
        messagesClass.generateMessage(`${user.name} have left the Chat Room!`)
      );
    }
  });

  socket.on("sendLocation", (data, callback) => {
    console.log(data);
    const user = getUser(socket.id);
    console.log(user);
    // if (!data && !user) {
    //   return callback();
    // }
    io.to(user.room).emit("LocationUser", data);
    callback(messagesClass.generateUrl(data));
  });
});

server.listen(port, () => {
  console.log(`We are connected to port:${port}`);
});
