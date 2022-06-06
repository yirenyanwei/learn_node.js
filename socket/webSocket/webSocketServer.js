const WebSocket = require('ws')
const WebSocketServer = WebSocket.WebSocketServer

const wss = new WebSocketServer({ port: 8888});

let clientName = 0
wss.on('connection', function connection(ws) {
    //收到消息
    ws.on('message', function message(data, isBinary) {
        //有人发消息来就广播给所有客户端
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
            client.send(data, { binary: isBinary });
            }
        });
    });
    //连接
    ws.on('open', function open() {
        ws.name = clientName++
        console.log(ws.name+' connected');
        ws.send(Date.now());
    });
    //关闭连接
    ws.on('close', function close() {
        console.log(ws.name+' disconnected');
    });
});