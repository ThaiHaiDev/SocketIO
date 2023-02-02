const express = require('express');
const app = express();
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');

const { Server } = require("socket.io");

const server = require('http').Server(app);
server.listen(3000);

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
    socket.on("Client-send-data", (data) => {
        console.log("User send data with id", socket.id, "---", data);
        io.sockets.emit("Server-send-data", data + "Data from server")
    })
});

app.get('/', function(req, res) {
    res.render("home");
})