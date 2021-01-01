const mongoose=require('mongoose')
const Schema=mongoose.Schema

const orderSchema=new Schema({
date:{
    type: Date,
    default:Date.now
},
order:{
    type: Number,
    required:true
},
service:{
    type:{
    type: String,
    required:true
    },
    objectId:{
        type: String,    
    default:''
    }
},
requestS:{
        type: Boolean,  
        default:false// request not processed
    },
user:{                  
        type: String,        
        default:''
        },

name:{
        type: String,
        required:true
    },
phone:{
        type: Number,
        required:true
    },
email:{
        type: String,
        default:''
},
description:{
        type: String,
        default:''
},
clientId:{
        type: String,
        default:''
}   

})

module.exports=mongoose.model('orders', orderSchema)