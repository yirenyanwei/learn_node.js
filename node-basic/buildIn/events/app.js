const EventListener = require('events')
//事件绑定触发
class MyEventListener extends EventListener{

}

const event = new MyEventListener()
//绑定触发
event.on('play', (params)=>{
    console.log(params)
})
event.once('play', (params)=>{
    console.log(params)
})
event.emit('play', 'test event')
event.emit('play', 'test event')
//移除单个
// event.off(eventName, listener)
//移除名字相同的所有
event.removeAllListeners('play')
event.emit('play', 'test event')
