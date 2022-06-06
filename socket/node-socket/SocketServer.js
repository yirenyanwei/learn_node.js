const net = require('net')
let clients = {}
let clientName = 0
//new net.Server([options][, connectionListener])
const server = net.createServer((socket) => {
    socket.name = clientName++
    clients[clientName] = socket
    //Sends data on the socket. 
    socket.write('hello, '+socket.name+'\n')
    //结束
    // socket.end('goodbye\n');

    socket.on('data', (msg) => {
        // console.log('客户端传来：' + msg.toString());
        broadcast(socket, msg.toString())
    })

    socket.on('error', (e) => {
        console.log('client error' + e);
        socket.end()
    })

    socket.on('close', (data) => {
        delete clients[socket.name]
        console.log(socket.name+' 下线了');
    })
  })
  
  server.on('error', (err) => {
    // Handle errors here.
    throw err;
  });
  
  // Grab an arbitrary unused port.
  //server.listen([port[, host[, backlog]]][, callback]) for TCP servers
  server.listen('8888', () => {
    console.log('opened server on', server.address());
  });

  function broadcast(client, msg) {
      for(let key in clients){
          clients[key].write(client.name+' say:'+msg)
      }
  }