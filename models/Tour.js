const mongoose=require('mongoose')
const Schema=mongoose.Schema

const tourSchema=new Schema({
name:{
    type: String,
    required:true
},
cost:{
    type: Number,
    required:true
},
contry:{
    type: String,
    required:true
},
datePlaces:{
dateTo:{
    type:Date,
    required:true
},
dateFrom:{
    type:Date,
    required:true
},
freePlaces:{
    type:Number,
    required:true
}
},
insallmentPlan:{
    type: Boolean,
    default:'false'
},
transportType:{
    type: String,
    required:true
},
description:{
    type: String,
    default:''
},
imagePaths:[{    
    type: String,
    default:''    
}],
categoryTour:{
    ref:'categoriesTours',
    type: Schema.Types.ObjectId
}
})

module.exports=mongoose.model('tours', tourSchema)