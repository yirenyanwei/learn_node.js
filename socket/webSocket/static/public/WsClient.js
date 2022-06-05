var ws = new WebSocket('ws://localhost:8888/')

ws.onopen = ()=> {
    ws.send('大家好')
}

ws.onmessage = function (msg) {
    const content = document.getElementById('content')
    content.innerHTML += msg.data+'<br/>'
}

ws.onerror = function (err) {
    console.log(err)
}

ws.onclose = function () {
    console.log('close')
}