const mongoose=require('mongoose')
const Schema=mongoose.Schema

const employeeSchema=new Schema({
email:{
    type: String,
    required:true
},
imagePath:{
    type: String,
    default:''
}
})

module.exports=mongoose.model('employees', employeeSchema)