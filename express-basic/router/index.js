const express = require('express')
const {list, listHtml, listHtmlStatic, token} = require('../controller/index')//控制层
//rmvp 中的r
// A Router instance is a complete middleware and routing system
// 路由中间件
const router = express.Router()

//挂在方法，又可以挂中间件
//按照怎么定义的怎么匹配,比如请求 /, 只会匹配到'/'
/*
router.get('/index', (req, res, next)=>{
    //get query 参数
    const query = req.query
    res.send(query)
})
//post请求
router.post('/index', (req, res)=>{
    //post 表单参数
    const data = req.body //配合bodyparser使用
    console.log(data)
    res.send(data)
})
router.get('/', (req, res)=>{
    res.send('index root')
})
//处理所有的请求类型 但是语义不明确
router.all('/index', (req, res, next)=>{
    res.send('dell all')
})
*/
/**
 * get 获取数据
 * post 添加数据
 * put 修改数据  覆盖式修改
 * patch 修改数据 选择性修改
 * delete 删除数据
 * 
 */
//处理跳转
router.all('/api/list', list)
router.all('/api/listHtml', listHtml)
router.all('/api/listHtmlStatic', listHtmlStatic)
router.all('/api/token', token)

module.exports = router