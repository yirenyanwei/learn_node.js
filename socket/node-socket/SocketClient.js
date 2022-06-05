const net = require('net');
const readline = require('readline')
//This function creates a new net.Socket with all options set to default, 
//immediately initiates connection with socket.connect(port[, host][, connectListener]), then returns the net.Socket that starts the connection.
const client = net.createConnection({ port: 8888 }, () => {
  // 'connect' listener.
  console.log('connected to server!');
  client.write('我来了!\r\n');
});
client.setEncoding('utf-8')
//Emitted when data is received. The argument data will be a Buffer or String. Encoding of data is set by socket.setEncoding().
client.on('data', (data) => {
    console.log(data.toString());
    say()
});
client.on('error', function (err) {
    console.log('error' + err);
  })
//Emitted when the other end of the socket signals the end of transmission, thus ending the readable side of the socket.
client.on('end', () => {
  console.log('disconnected from server');
});

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  function say() {
    r1.question('请输入：\n', (inputMsg) => {
      if (inputMsg != 'bye') {
        client.write(inputMsg + '\n')
      } else {
        client.destroy()
        r1.close()
      }
    })
  }
  say()