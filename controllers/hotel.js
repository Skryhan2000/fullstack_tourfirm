const Hotel=require('../models/Hotel')
const Room=require('../models/Room')
const errorHandler=require('../utils/errorHandler')
const { removeImg } = require('../utils/removeImg')

module.exports.getAll=async function(req,res){
    try{ 
        const hotels=await Hotel.find()
        res.status(200).json(hotels)
    }catch(e){
        errorHandler(res,e)
    }
}

module.exports.getById=async function(req,res){
    try{
        const hotel=await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    }catch(e){
        errorHandler(res,e)
    }
}

module.exports.remove=async function(req,res){
    try{
        await Hotel.remove({_id:req.params.id})               
        await Room.remove({hotel:req.params.id})        
        res.status(200).json({
            message:'Отель был удален.'
        })
    }catch(e){
        errorHandler(res,e)
    }
}

module.exports.create=async function(req,res){
    const candidate=await Hotel.findOne({name:req.body.name, address:req.body.address})
    if(candidate){      
        res.status(409).json({
            message: 'Такой отель уже добавлен в систему.'
        })
    }else{
    try{             
        const hotel=await new Hotel({                     
            name:req.body.name,  
            text:req.body.text ? req.body.text: '',
            site:req.body.site ? req.body.site: '',
            address:req.body.address,
            // {
            //     contry:req.body.address.contry,
            //     town:req.body.town,
            //     street:req.body.street,
            //     number:req.body.number,
            //     corpus:req.body.corpus ? req.body.corpus: ''
            // },
            phoneList:req.body.phoneList,
            stars: req.body.stars ? req.body.stars: '',
            hotelService:req.body.hotelService,
            imagePaths: req.file ? req.file.path: ''
        }).save()
        res.status(201).json(hotel)//.json(generalInfo)       
    }catch(e){
        errorHandler(res,e)
    }
}
}

module.exports.update=async function(req,res){//Может еще переделаю инфо и отельв одну сущность
  console.log(req.body.hotelService)
    const updated={
        name:req.body.name,
        stars: req.body.stars,         
        text:req.body.text,// ? req.body.text: '',
        site:req.body.site,// ? req.body.site: '',
        address:req.body.address,
        // {
        //     contry:req.body.contry,
        //     town:req.body.town,
        //     street:req.body.street,
        //     number:req.body.number,
        //     corpus:req.body.corpus //? req.body.corpus: ''
        // },
        phoneList:req.body.phoneList ,        
        hotelService:req.body.hotelService
    }
    if(req.file){      
    updated.imagePaths=req.file.path   
    }
    try{
        if(req.file){ 
            removeImg(req.params.id, Hotel)
        }
       const hotel=await Hotel.findOneAndUpdate(
           {_id: req.params.id},
           {$set:updated },
           {new: true}
           )             
    res.status(200).json(hotel)       
    }catch(e){
        errorHandler(res,e)
    }  
}