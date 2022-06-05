const http = require('http')
const https = require('https')
const url = require('url')
const cheerio = require('cheerio')
const server = http.createServer((req, res)=>{
    let urlStr = req.url
    let data = ''
    https.get('https://www.meizu.com/', (result)=>{
        result.on('data', (chunk)=>{
            data+=chunk
        })
        result.on('end', ()=>{
            filterData(data)
        })
    })
})

server.listen(8080, ()=>{
    console.log('localhost:8080')
})

function filterData(data) {
    const $ = cheerio.load(data)
    $('.section-item-box p').each((index, value)=>{
        console.log(index)
        console.log($(value).text())
    })
}
