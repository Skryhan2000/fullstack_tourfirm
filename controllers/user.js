const bcrypt=require('bcryptjs')
const User=require('../models/User')
const errorHandler=require('../utils/errorHandler')


module.exports.getAll=async function(req,res){
    try{
        const users=await User.find({status: {$ne:"client"}})
        res.status(200).json(users)
    }catch(e){
        errorHandler(res,e)
    }
}

module.exports.getById=async function(req,res){
    try{
        const user=await User.findById(req.params.id)
        res.status(200).json(user)
    }catch(e){
        errorHandler(res,e)
    }
}

module.exports.remove=async function(req,res){
    try{
        await User.remove({_id: req.params.id})
        res.status(200).json({
            message:'Пользователь был удален'
        })
     }catch(e){
         errorHandler(res,e)
     }
}

module.exports.create=async function(req,res){       
    const candidate=await User.findOne({email: req.body.email})    
    console.log(`Thath we have${req.body.email}`)
    if(candidate && candidateEmpl){      
        res.status(409).json({
            message: 'Такой пользователь уже добавлен.'
        })
    }else{        
        const salt=bcrypt.genSaltSync(10)
        const password=req.body.password        
        const user=new User({            
            fullName:req.body.fullName,        
            phones:req.body.phones,
            email:req.body.email,
            password: bcrypt.hashSync(password, salt), //шифровка
            status:req.body.status,
            imagePath: req.file ? req.file.path: ''
        })
        console.log(`Our user: ${user}`)
        
        try{
            await user.save()                   
            res.status(201).json(user)
        }catch(e){
            errorHandler(res,e)
        }
    }    
}

module.exports.update=async function(req,res){
    
    const updated={        
        fullName:req.body.fullName,        
        phones:req.body.phones,
        email:req.body.email,
        status:req.body.status
    }
    if(req.body.password){
    const salt=bcrypt.genSaltSync(10)
    const password=req.body.password      
    updated.password= bcrypt.hashSync(password, salt)   
    } 
    if(req.file){      
        updated.imagePath=req.file.path    
        }
    try{              
        const user=await User.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new:true}
            )  
            if(req.file){ 
                removeImg(req.params.id, User)  
                }                          
            res.status(200).json(user)
    }catch(e){
        errorHandler(res,e)
    }
}