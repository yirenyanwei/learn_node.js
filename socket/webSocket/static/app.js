const http = require('http')
const url = require('url')
const path = require('path')
const mime = require('mime')
const fs = require('fs')
const server = http.createServer((req, res)=>{
    let urlStr = req.url
    let urlObj = url.parse(urlStr)
    let pathname = urlObj.pathname //去掉查询参数后的路径
    let resolvepath = path.resolve(__dirname, './public', './'+pathname)//本地绝对路径
    console.log(resolvepath)
    readStaticFile(resolvepath, res)
})
server.listen(8080, ()=>{
    console.log('localhost:8080')
})

function readFile(resolvepath, res) {
    fs.readFile(resolvepath, (err, data)=>{
        if(err) {
            res.end('read file error')
            return
        }
        res.end(data)
    })
}

function readDir(resolvepath, res) {
    fs.readdir(resolvepath, (err, files)=>{
        if(err) {
            res.end('read dir error')
            return
        }
        let str = `
        this is a dir
        ${files}
        `
        res.end(str)
    })
}

function readStaticFile(resolvepath, res) {
    let pathObj = path.parse(resolvepath)
    let tpe = mime.getType(pathObj.ext) || 'text/html'
    res.writeHead(200, {
        'content-type':`${tpe};charset=utf-8`//设置数据类型
    })
    //判断文件是否存在
    fs.exists(resolvepath, (e)=>{
        if(e) {
            if(pathObj.ext) {
                readFile(resolvepath, res)
            }else {
                readDir(resolvepath, res)
            }
        }else {
            res.end('not exit 404')
        }
    })
}