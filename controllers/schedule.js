const Schedule=require('../models/Schedule')
const errorHandler=require('../utils/errorHandler')


module.exports.getByTourId=async function(req,res){
    try{
        const schedules=await Schedule.find(
            {tour:req.params.tourId}
            )
        res.status(200).json(schedules)
    }catch(e){
        errorHandler(res,e)
    }
}

module.exports.create=async function(req,res){
    try{
    const schedule=await new Schedule({
        name:req.body.name,
        days:req.body.days,
        // {
        //    date:'sss',//req.body.date,
        //    time:'sss',//req.body.time,
        //    cost:0,//req.body.cost,
        //    action:'sss',//req.body.action
        // },            
        contries:req.body.contries ? req.body.contries:'', 
        hotels:req.body.hotels ? req.body.hotels:'',          
        tour:req.body.tour
        }).save()
        res.status(201).json(schedule)
    }catch(e){
        errorHandler(res,e)
    }
}

module.exports.update=async function(req,res){
    try{        
       const schedule=await Schedule.findOneAndUpdate(
           {_id: req.params.id},
           {$set:req.body},
           {new: true}
           )
       res.status(200).json(schedule)
    }catch(e){
        errorHandler(res,e)
    }  
}

module.exports.remove= async function(req,res){
    try{
       await Schedule.remove({_id: req.params.id})
       res.status(200).json({
           message:'Программа тура была удалена'
       })
    }catch(e){
        errorHandler(res,e)
    }
}