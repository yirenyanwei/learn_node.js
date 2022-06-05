const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/music', { useUnifiedTopology: true, useNewUrlParser: true })
.then(()=>{
    console.log('connect')
}, err=>{
    console.log('connect err')
})

const Schema = mongoose.Schema;
const studentSchema = new Schema({
    name: String,
    age: Number
})

const Users = mongoose.model('student', studentSchema)

const MusicSchema = new Schema({
    name: String,
    author: String
})

const Music = mongoose.model('Music', MusicSchema)

function saveMusic(params) {
    let music = new Music(params)
    music.save(function (err) {
        if (err) console.log(err)
        // saved!
        console.log('save')
      });
}

function find(params) {
    Music.find({}, function (err, data) {
        if(err){
            console.log('error', err)
        }
        console.log(data)
    })
}
// saveMusic({name:'summer', author:'tom'})
find()
