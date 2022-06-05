console.log('common js')
//ajax请求   请求后端数据，前端渲染
$.ajax({
    url: './api/list',
    success(ret) {
        console.log(ret)
        renderClient(ret)
    }
})
function renderClient(ret) {
    /*
    let html = '<ul>'
    for(let i = 0; i<ret.data.length; i++){
        html+=`<li>index${ret.data[i]}</li>`
    }
    html+='</ul>'
    //用template渲染
    */
    let temp = `
    <ul>
        {{each data}}
            <li>index{{$value}}</li>
        {{/each}}
    </ul>
    `
    let html = template.render(temp, {data:ret.data})
    //加载到list上
    $('#list').html(html)
}