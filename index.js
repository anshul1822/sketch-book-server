const express = require("express");
const cors = require('cors');
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();

const isDev = app.settings.env === 'development';
const URL = isDev ? 'http://localhost:3000' : 'https://sketch-book-pearl.vercel.app';
app.use(cors({origin : URL}))

const httpServer = createServer(app);
const io = new Server(httpServer, { cors : URL });

io.on("connection", (socket) => {
  // ...
  console.log("Server connected...");

  socket.on('beginPath', (args) => {
    socket.broadcast.emit('beginPath', args)
  })

  socket.on('drawLine', (args) => {
    socket.broadcast.emit('drawLine', args)
  })


  socket.on('changeConfig', (args) => {
    socket.broadcast.emit('changeConfig', args);
  })


});

httpServer.listen(5000);