const mongoose=require('mongoose')
const Schema=mongoose.Schema

const hotelSchema=new Schema({
    name:{
        type: String,
        required:true
    },
    text:{
        type: String,
        default:''
    },
    site:{
        type: String,
        default:''
    },
    address:{
        contry:{
            type: String,
            required:true 
        },
        town:{
            type: String,
            required:true  
        },
        street:{
            type: String,
            required:true  
        },
        number:{
            type: Number,
            required:true  
        },
        corpus:{
            type:String ,
            default:''  
        }
        },
    phoneList:[{
            type: Number,
            required:true
        }],
stars:{
    type: Number,
    default:''
},
hotelService:[{
    cost:{
        type: Boolean,        
        default:false //without
    },
    typeServ:{
        type: String,        
        default:''
    },
    nameHotelService:{
        type: String,        
        default:''
    }   
}],
imagePaths:[{
    type: String,
    default:''
}]
})

module.exports=mongoose.model('hotels', hotelSchema)