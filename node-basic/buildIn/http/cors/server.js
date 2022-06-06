const http = require('http')
const url = require('url')
const server = http.createServer((req, res)=>{
    let urlObj = url.parse(req.url, true)//解析query 
    switch(urlObj.pathname){
        case '/api/data':
            res.writeHead(200, {
                'content-type':'application/json',
                //配置跨域的地址
                'Access-Control-Allow-Origin':'*'
            })
            res.write(`{"ret":true, "data":"hello"}`)
            break
        default:
            res.write('page not fond')
    }
    res.end()
})
server.listen(8080, ()=>{
    console.log('localhost:8080')
})
