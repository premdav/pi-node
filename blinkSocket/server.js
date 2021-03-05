const fs = require('fs');
const Express = require('express');
const app = Express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('connection event');
    let lightVal = 0;
    socket.on('light', (data) => {
        lightVal = data;
        if (lightVal) console.log(lightVal);
    });
});

http.listen(8080, () => console.log('listening on port 8080'));
