const Tour=require('../models/Tour')
const Schedule=require('../models/Schedule')
const errorHandler=require('../utils/errorHandler')
const { removeImg } = require('../utils/removeImg')

module.exports.getByCategoryId= async function(req,res){
try{
    const tours=await Tour.find({
        categoryTour:req.params.categoryId
    })     
    res.status(200).json(tours)
}catch(e){
    errorHandler(res,e)
}
}

module.exports.find= async function(req,res){
     const query={
        
    }
    // //date start
    // if(req.query.start){
    //     query.datePlaces.dateTo={
    //         $gte:req.query.start
    //     }
    // }
    // if(req.query.end){
    //     // if(!query.date){
    //     //     query.date={}
    //     // }
    //     query.datePlaces.dateFrom['$lte']=req.query.end
    // }
    // if(req.query.contry){
    //     query.contry=req.query.contry
    // }
    try{        
        const tours=await Tour.find({contry:req.params.contry})//query
        //.sort({dateTo:1})     
        res.status(200).json(tours)
    }catch(e){
        errorHandler(res,e)
    }
    }

module.exports.getById=async function(req,res){
    try{
        const tour=await Tour.findById(req.params.id)        
        res.status(200).json(tour)
    }catch(e){
        errorHandler(res,e)
    }
}

module.exports.remove=async function(req,res){
    try{        
        await Schedule.remove({tour:req.params.id})
        await Tour.remove({_id:req.params.id})        
        res.status(200).json({
            message:'Тур был удален.'
        })
    }catch(e){
        errorHandler(res,e)
    }
}

module.exports.create=async function(req,res){       
    try{
        const tour=await new Tour({
            name:req.body.name,
            contry:req.body.contry,
            cost:req.body.cost,
            datePlaces:{
            dateTo:req.body.dateTo,
            dateFrom:req.body.dateFrom,
            freePlaces:req.body.freePlaces
        },            
            insallmentPlan:req.body.insallmentPlan,
            transportType:req.body.transportType,
            description:req.body.description ? req.body.description:'',
            imagePaths: req.file ? req.file.path: '',
            categoryTour:req.body.categoryTourId
        }).save()
        res.status(201).json(tour)
    }catch(e){
        errorHandler(res,e)
    }
}

module.exports.update=async function(req,res){
    const updated={        
        name:req.body.name,
        contry:req.body.contry,
        cost:req.body.cost,
        datePlaces:{
        dateTo:req.body.dateTo,
        dateFrom:req.body.dateFrom,
        freePlaces:req.body.freePlaces
    },            
        insallmentPlan:req.body.insallmentPlan,
        transportType:req.body.transportType,
        description:req.body.description ? req.body.description:'',        
        categoryTour:req.body.categoryTourId
    }
    if(req.file){      
    updated.imagePaths=req.file.path  
    }
    try{
        if(req.file){ 
            removeImg(req.params.id, Tour)
        }
       const tour=await Tour.findOneAndUpdate(
           {_id: req.params.id},
           {$set:updated},
           {new: true}
           )
       res.status(200).json(tour)
    }catch(e){
        errorHandler(res,e)
    }  
}