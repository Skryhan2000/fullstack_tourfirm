const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema=new Schema({
    fullName:{
        type: String,
        required:true,
        unique:true
    },
    
    phones:[{
        type: Number,
        default:''
    }],
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
    type: String,
    required:true
},
status:[{
    type: String,
    required:true
}],
imagePath:{
    type: String,
    default:''
}
})

module.exports=mongoose.model('users', userSchema)