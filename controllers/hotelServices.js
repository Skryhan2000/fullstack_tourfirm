const HotelServices = require('../models/HotelServices')
const errorHandler=require('../utils/errorHandler')

module.exports.getAll=async function(req,res){
    try{
        const hotelServices=await HotelServices.find()
        res.status(200).json(hotelServices)
    }catch(e){
        errorHandler(res,e)
    }
}

module.exports.remove=async function(req,res){
    try{
        await HotelServices.remove({_id:req.params.id})             
        res.status(200).json({
        message:'Услуга была удалена.'
        })
    }catch(e){
        errorHandler(res,e)
    }
}

module.exports.create=async function(req,res){
    
    const hotelServices=new HotelServices({
        nameHotelService:req.body.nameHotelService
    })
    try{
        await hotelServices.save()
        res.status(201).json(hotelServices)
    }catch(e){
        errorHandler(res,e)
    }
}


module.exports.update=async function(req,res){
    try{              
        const hotelServices=await HotelServices.findOneAndUpdate(
            {_id: req.params.id},
            {$set:req.body},
            {new:true}
            )             
            res.status(200).json(hotelServices)
    }catch(e){
        errorHandler(res,e)
    }
}
