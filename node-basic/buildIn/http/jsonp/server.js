const http = require('http')
const url = require('url')
const server = http.createServer((req, res)=>{
    let urlObj = url.parse(req.url, true)//解析query 
    switch(urlObj.pathname){
        case '/api/data':
            let cb = urlObj.query.cb
            res.write(`${cb}("hello")`)
            break
        default:
            res.write('page not fond')
    }
    res.end()
})
server.listen(8080, ()=>{
    console.log('localhost:8080')
})
