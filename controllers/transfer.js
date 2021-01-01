const Transfer = require('../models/Transfer')
const errorHandler=require('../utils/errorHandler')

module.exports.getAll=async function(req,res){
    try{
        const transfer=await Transfer.find()
        res.status(200).json(transfer)
    }catch(e){
        errorHandler(res,e)
    }
}

module.exports.remove=async function(req,res){
    try{
        await Transfer.remove({_id:req.params.id})             
        res.status(200).json({
        message:'Трансфер был удален.'
        })
    }catch(e){
        errorHandler(res,e)
    }
}

module.exports.create=async function(req,res){
    
    const transfer=new Transfer({
        nameDirect:req.body.nameDirect,
        timeTo: req.body.timeTo,
        timeFrom: req.body.timeFrom
    })
    try{
        await transfer.save()
        res.status(201).json(transfer)
    }catch(e){
        errorHandler(res,e)
    }
}


module.exports.update=async function(req,res){
    try{              
        const transfer=await Transfer.findOneAndUpdate(
            {_id: req.params.id},
            {$set:req.body},
            {new:true}
            )             
            res.status(200).json(transfer)
    }catch(e){
        errorHandler(res,e)
    }
}
