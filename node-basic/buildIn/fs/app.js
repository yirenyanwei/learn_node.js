const fs = require('fs')
//创建文件夹
fs.mkdir('./logs', (err)=>{
    if(err) return console.log(err)
    console.log('mkdir')
    
})
//修改文件夹/文件的名字
fs.rename('./logs', './log', (err)=>{
    if(err) return console.log(err)
    console.log('rename logs->log')
})
//删除问价夹
fs.rmdir('./log', (err)=>{
    if(err) return console.log(err)
    console.log('rmdir log')
})
//查询
fs.readdir('./log', (err, data)=>{
    if(err) return console.log(err)
    console.log(data)
})