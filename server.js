const io = require("socket.io")(3000, {
    cors: {
      origin: "http://localhost:5500",
      methods: ["GET", "POST"]
    }
});

const users = {}; // Each socket connection is unique

io.on('connection', socket => {
    // To client: chat-msg
    socket.on('send-chat-msg', msg => {
        socket.broadcast.emit('chat-msg', {
            msg,
            user: users[socket.id]
        }); //sends data to all but original sender
    });    
    
    // To client: user-connected
    socket.on('new-user', userName => {
        users[socket.id] = userName;
        socket.broadcast.emit('user-connected', userName); //sends data to all but original sender
    });

    // To client: user-disconnected
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', `${socket.id}`); //sends data to all but original sender
        delete users[socket.id];
    });
});

