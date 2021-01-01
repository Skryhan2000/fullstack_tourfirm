const mongoose=require('mongoose')
const Schema=mongoose.Schema

const transferSchema=new Schema({
nameDirect:{
    type: String,
    required:true
},
timeTo:{
    type: String,
    required:true
},
timeFrom:{
    type: String,
    required:true
}
})

module.exports=mongoose.model('transfers', transferSchema)