const Room=require('../models/Room')
const errorHandler=require('../utils/errorHandler')
const { removeImg } = require('../utils/removeImg')


module.exports.getByHotelId=async function(req,res){
    try{
        const rooms=await Room.find({
            hotel:req.params.hotelId
        })
        res.status(200).json(rooms)
    }catch(e){
        errorHandler(res,e)
    }
}



module.exports.remove= async function(req,res){
    try{
       await Room.remove({_id: req.params.id})
       res.status(200).json({
           message:'Комната была удалена'
       })
    }catch(e){
        errorHandler(res,e)
    }
}

module.exports.create=async function(req,res){
    const candidate=await Room.findOne({number:req.body.number, hotel:req.body.hotelId})
    if(candidate){      
        res.status(409).json({
            message: 'Такая комната в этом отеле уже добавлена в систему.'
        })
    }else{
    try{
        const room=await new Room({
            number:req.body.number,
            berth:req.body.berth,
            type:req.body.type,
            cost:req.body.cost,
            time:req.body.time,            
            hotel:req.body.hotel,
            imagePaths: req.file ? req.file.path: ''
        }).save()
        res.status(201).json(room)
    }catch(e){
        errorHandler(res,e)
    }
}
}

module.exports.update= async function(req,res){
    const updated={        
        number:req.body.number,
        berth:req.body.berth,
        type:req.body.type,
        cost:req.body.cost,
        time:req.body.time,        
        hotel:req.body.hotel
    }
    if(req.file){      
    updated.imagePaths=req.file.path      
    }
    try{
        if(req.file){ 
            removeImg(req.params.id, Room)
        }
       const room=await Room.findOneAndUpdate(
           {_id: req.params.id},
           {$set:updated},
           {new: true}
           )
       res.status(200).json(room)
    }catch(e){
        errorHandler(res,e)
    }  
}