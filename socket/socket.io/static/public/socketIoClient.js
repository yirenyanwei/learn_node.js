var socket = io.connect('http://localhost:8888');
//收到后端自定义事件
socket.on('sendMsg', function(msg){
    const content = document.getElementById('content')
    content.innerHTML += msg + '<br/>'
})
  