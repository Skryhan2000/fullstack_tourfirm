const mongoose=require('mongoose')
const Schema=mongoose.Schema

const scheduleSchema=new Schema({
name:{
    type: String,
    required:true
},
contries:[{    
        type: String,
        default:''        
}],
days:[{
    date:{
        type: String,
        required:true
    },
    time:{
        type: String,
        required:true
    },
    action:{
        type: String,
        required:true
    },
    cost:{
        type: Number,
        required:true
    }
}],
hotels:[{      
    type: String,
    default:''           
}],
tour:{
    ref:'tours',
    type: Schema.Types.ObjectId
}
})

module.exports=mongoose.model('schedules', scheduleSchema)