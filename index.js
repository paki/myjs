const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.use('/build', express.static(__dirname + '/ui/build'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/ui/index.html');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});