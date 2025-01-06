const io = require("socket.io")(3000, {
    cors: {
      origin: "http://localhost:5500",
      methods: ["GET", "POST"]
    }
  });

io.on('connection', socket => {
    socket.emit('chat-msg', 'hello world')
});