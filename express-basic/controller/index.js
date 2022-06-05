var template = require('art-template')
const path = require('path')
const fs = require('fs')
var jwt = require('jsonwebtoken');
var listModel = require('../model/list')
const list = (req, res, next)=>{
    //服务端渲染，直接给网页格式
    // let data = '<h2>服务端渲染<h2>'

    //客户端渲染，只给数据，让客户端解析渲染
    /*
    data = {
        ret: true,
        data: [1,2,3]
    }
    res.send(data)
    */

   //客户端渲染 art-template 的形式
    let dataList = [1,2,3]
    //设置头部
    res.set('Content-Type', 'application/json;charset=utf-8')
    //art-templete 方法  文件名|传入的参数
    res.render('list', {dataList})
}

const listHtml = (req, res, next)=>{
    //服务端渲染，template
    let dataList = [1,2,3]
    // res.set('Content-Type', 'text/html;charset=utf-8')
    res.render('list-html', {data: dataList})
}

const listHtmlStatic = (req, res, next)=>{
    //服务端渲染，template  发布成静态页面  比较常用的CMS模式
    //control只负责组装view与model
    let filePath = path.resolve(__dirname, '../view/list-html.art')
    var html = template(filePath, {
        data: listModel
    });
    let outPath = path.resolve(__dirname, '../public/list.html')
    fs.writeFile(outPath, html, ()=>{
        res.send('update list.htm')
    })
}

const token = (req, res, next)=>{
    //加密 default: HS256 对称加密，加密、解密的秘钥相同
    //jwt.sign(payload, secretOrPrivateKey, [options, callback])
    const key = '123'
    var tk = jwt.sign({ name: 'admin' }, key);
    //验证
    // jwt.verify(token, secretOrPublicKey, [options, callback])
    var decoded = jwt.verify(tk, key);
    console.log(decoded.foo) // bar

    //非对称加密  加密、解密的秘钥不同 ssh openssl
    // sign with RSA SHA256
    let key_path = path.resolve(__dirname, '../keys/rsa_private_key.pem')
    var privateKey = fs.readFileSync(key_path);
    tk = jwt.sign({ name: 'admin' }, privateKey, { algorithm: 'RS256'});
    //验证
    key_path = path.resolve(__dirname, '../keys/rsa_public_key.pem')
    var publicKey = fs.readFileSync(key_path);
    decoded = jwt.verify(tk, publicKey);
    res.send(decoded)
}


module.exports = {list, listHtml, listHtmlStatic, token}