const CategoryTour=require('../models/CategoryTour')
const Tour= require('../models/Tour')
const Schedule=require('../models/Schedule')
const errorHandler=require('../utils/errorHandler')
const { removeImg } = require('../utils/removeImg')



module.exports.getAll=async function(req,res){
    try{
        const categoriesTour=await CategoryTour.find()
        res.status(200).json(categoriesTour)
    }catch(e){
        errorHandler(res,e)
    }
}

module.exports.getById=async function(req,res){
    try{
        const categoryTour=await CategoryTour.findById(req.params.id)
        res.status(200).json(categoryTour)
    }catch(e){
        errorHandler(res,e)
    }
}

module.exports.remove=async function(req,res){
    try{
        await CategoryTour.remove({_id:req.params.id})
        const tours=await Tour.find({
            categoryTour:req.params.id
        })
        await Schedule.remove({tour:tours.id})//attention
        await Tour.remove({categoryTour:req.params.id})        
        res.status(200).json({
            message:'Категория была удалена'
        })
    }catch(e){
        errorHandler(res,e)
    }
}

module.exports.create=async function(req,res){
    const candidate=await CategoryTour.findOne({name: req.body.name})
    if(candidate){      
        res.status(409).json({
            message: 'Такая категория тура уже есть.'
        })
    }else{
    const categoryTour=new CategoryTour({
        name:req.body.name,
        imagePath: req.file ? req.file.path: ''
    })
    try{
        await categoryTour.save()
        res.status(201).json(categoryTour)
    }catch(e){
        errorHandler(res,e)
    }
}
}

module.exports.update=async function(req,res){
    const updated={
        name:req.body.name
    }
    if(req.file){      
    updated.imagePath=req.file.path    
    }
    try{
        if(req.file){         
        removeImg(req.params.id, CategoryTour)
        }      
        const categoryTour=await CategoryTour.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new:true}
            )             
            res.status(200).json(categoryTour)
    }catch(e){
        errorHandler(res,e)
    }
}

