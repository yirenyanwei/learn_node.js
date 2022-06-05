const express = require('express')
const app = express()

/**
//匹配规则从上到下，碰到send就结束
app.use('/api', (req, res)=>{
    console.log(req.url)
    //返回给前端
    res.send('world')
})
 */
//将中间件指定为回调函数，回调函数又被称为中间件
/*
app.use('/', (req, res)=>{
    console.log(req.url)
    //返回给前端
    res.send('hello')
})
*/

//执行多个中间件，中间件栈
/*
app.use('/', (req, res, next)=>{
    console.log('0')
    next()
}, (req, res)=>{
    console.log('1')
})
*/
//传数组的形式
let middlewares = [(req, res, next)=>{
    console.log('0')
    next()
}, (req, res, next)=>{
    console.log('1')
    next()
}]
app.use('/', middlewares)
//在插入一个中间件，接着/之后执行
app.use('/api', (req, res)=>{
    console.log('2')
    //返回给前端
    res.send('world')
})
//输入localhost:8080/api  执行顺序是 0，1，2

app.listen(8080, ()=>{
    console.log('localhost:8080')
})