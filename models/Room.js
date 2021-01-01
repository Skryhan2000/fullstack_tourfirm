const mongoose=require('mongoose')
const Schema=mongoose.Schema

const roomSchema=new Schema({
number:{
    type: String,
    required:true
},
type:[{
    type: String,
    required:true
}],
cost:{
    type: Number,
    required:true
},
berth:[{
    type:Number,
    required:true
}],
time:[{
    dateTo:{
    type: String,
    required:true
},
dateFrom:{
    type:String,
    required:true
},
statusR:{
    type:Boolean,
    required:true,
    default:true //room is free
}
}],
imagePaths:[{    
        type: String,
        default:''    
    }],
hotel:{
    ref:'hotels',
    type: Schema.Types.ObjectId
}
})

module.exports=mongoose.model('rooms', roomSchema)