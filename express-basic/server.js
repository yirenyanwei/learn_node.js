const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')//解析node body的中间件
const router_index = require('./router/index')
const app = express()
//不写路径表示所有路径都会进
// app.use((req, res, next)=>{
//     console.log(12345)
//     next()
// })

// parse application/x-www-form-urlencoded  处理表单数据
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json 处理json类型数据
app.use(bodyParser.json())

//通过如下代码就可以将 public 目录下的图片、CSS 文件、JavaScript 文件对外开放访问了：
//静态资源服务中间件，内置的
app.use(express.static('./public'))

// view engine setup
app.engine('art', require('express-art-template'));
app.set('view options', {//官网写错了
    debug: process.env.NODE_ENV !== 'production',
    //// 是否开启对模板输出语句自动编码功能。为 false 则关闭编码输出功能，出现格式问题可以改为FALSE
    escape: true,
});
app.set('views', path.join(__dirname, 'view'));//设置views的路径
app.set('view engine', 'art');// 设置扩展名

app.use('/', router_index)

app.listen(8080, ()=>{
    console.log('localhost:8080')
})