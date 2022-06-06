const axios = require('axios')
axios.get('http://localhost/ajax/server/test.php')
.then(result => {
    console.log(result.data)
})
.catch(err => {

})