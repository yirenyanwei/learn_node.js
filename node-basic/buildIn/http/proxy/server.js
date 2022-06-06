const http = require('http')
const url = require('url')
const {createProxyMiddleware} = require('http-proxy-middleware')
const server = http.createServer((req, res)=>{
    let urlStr = req.url
    if(/\/api/.test(urlStr)) {//include /ajax
        //使用中间代理 第一个参数是 content 前边的内容替换
        //http://localhost:8080/api/login.html  会替换成 http://localhost/ajax/login.html
        // 用服务器得到请求结果
        let proxy = createProxyMiddleware('/api', {
            target: 'http://localhost',
            changeOrigin: true,//切换原
            pathRewrite: //重写路径,可以替换路径
            {
                'api': 'ajax'
            }
        })
        proxy(req, res)
    }else {
        
        res.end('404')
    }
})
server.listen(8080, ()=>{
    console.log('localhost:8080')
})
