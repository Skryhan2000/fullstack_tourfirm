const mongoose=require('mongoose')
const Schema=mongoose.Schema

const hotelServices=new Schema({
nameHotelService:{
    type: String,
    required:true
}
})

module.exports=mongoose.model('hotelServices', hotelServices)