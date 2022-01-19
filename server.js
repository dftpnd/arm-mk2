var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var HTTP_PORT = 3002;

// app.use('/', express.static(path.join(__dirname, 'public')));
app.use("/", express.static(__dirname + "/public"));

io.on("connection", function (socket) {
  console.log("new connection: " + socket.id);

  var user = socket.id;

  socket.on("disconnect", function () {
    console.log("user " + user + " disconnected");
  });

  socket.on("vote", function (msg) {
    console.log("vote: " + msg);
  });
});

http.listen(HTTP_PORT, function () {});
