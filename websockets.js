const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
let room;

const app = express();
app.use(express.static("public"));
const server = http.createServer(app);
// this io is responsible for handling all the socket connections
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected ", socket.id);
  // setInterval(() => {
  //   socket.emit(
  //     "message",
  //     "message from server" + "-" + socket.id + "at" + new Date()
  //   );
  // }, 2000);
  // message event is fired when a user sends a message
  socket.on("message", (data) => {
    socket.broadcast.emit("broadcast", data);
  });

  socket.on("create_grp", (roomId) => {
    console.log("group is created");
    // first participant
    room = roomId;
    socket.join(roomId);
  });
  socket.on("join_room", () => {
    console.log(socket.id + " joined the room ", room);
    socket.join(room);
  });
  socket.on("grp message", function (data) {
    socket.to(room).emit("serv_grp_message", data);
  });

  // disconnect event is fired when a user disconnects from the server
  socket.on("disconnect", () => {
    console.log("user disconnected" + socket.id);
  });
});

// app.get("/", (req, res) => {
//   //   res.send("hello world");
//   // send index.html under public folder
//   res.sendFile(__dirname + "/public/index.html");
// });

server.listen(3000, () => console.log("listening at 3000"));
