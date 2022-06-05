const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {cors:true});// cors:true 解决跨域问题

//静态资源服务中间件，内置的
// app.use(express.static('./static/public'))
app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
    res.send('hello')
});

io.on('connection', (socket) => {
    console.log('a user connected');
    // socket.broadcast.emit('hi');
    // io.emit('chat message', msg);
    //定义socket事件 接受前端的消息
    socket.on('sendMsg', (msg)=>{
        socket.broadcast.emit('sendMsg', msg);
    })

    socket.conn.once("upgrade", () => {
    // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
        console.log("upgraded transport", socket.conn.transport.name); // prints "websocket"
    });

    socket.conn.on("packet", ({ type, data }) => {
    // called for each packet received
    });

    socket.conn.on("packetCreate", ({ type, data }) => {
    // called for each packet sent
    });

    socket.conn.on("drain", () => {
    // called when the write buffer is drained
    });

    socket.conn.on("close", (reason) => {
    // called when the underlying connection is closed
        console.log('socket close')
    });
});

server.listen(8888, () => {
  console.log('listening on *:8888');
});