const _ = require('lodash')
// let arr = [1,2,3,4,5]
// let res = _.chunk(arr, 2)
// console.log(res)
// 切分数组
function myChunk(arr) {
    return _.chunk(arr, 2)
}
module.exports = myChunk