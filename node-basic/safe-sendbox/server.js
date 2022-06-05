const http = require('http')
//node.js可以访问跨域的请求
http.get('http://localhost/ajax/server/test.php', (res)=>{
    let str = ''
    res.on('data', (chunk) => {
        str += chunk
    })
    res.on('end', ()=> {
        console.log(str)
    })
})