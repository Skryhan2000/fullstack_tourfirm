const mongoose=require('mongoose')
const Schema=mongoose.Schema

const categoryTourSchema=new Schema({
name:{
    type: String,
    required:true
},
imagePath:{
    type: String,
    default:''
}
})

module.exports=mongoose.model('categoriesTour', categoryTourSchema)