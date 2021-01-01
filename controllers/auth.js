const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User=require('../models/User')
const keys=require('../config/keys')
const errorHandler=require('../utils/errorHandler')

module.exports.login=async function(req,res){
    const candidate=await User.findOne({email: req.body.email})
  if(candidate){
const passwordResult=bcrypt.compareSync(req.body.password, candidate.password)
if(passwordResult){    
    const token=jwt.sign({
        email:candidate.email,
        userId: candidate._id
    },keys.jwt, {expiresIn:60*60})

    res.status(200).json({
        token:`Bearer ${token}`
    })
}else{
    res.status(401).json({
        message:'Неверный пароль. Попробуйте еще раз!'
    })
}
  }else{
      res.status(404).json({
          message: 'Пользователь с таким email не найден.'
      })
  }
}



module.exports.register=async function(req,res){
    const candidate = await User.findOne({email: req.body.email})
    if(candidate){
    res.status(409).json({
        message: 'Email уже используется.'
    })
    }else{    
    str='client'
    const salt=bcrypt.genSaltSync(10)
    const password=req.body.password
    const user= new User({
        fullName:req.body.fullName,        
        phones:req.body.phones,
        email:req.body.email,
        password: bcrypt.hashSync(password, salt), //шифровка
        status:str
    })    
    try{
        await user.save().then(()=>console.log('Пользователь создан.'))
        res.status(201).json(user)
    }catch(e){
        errorHandler(res,e)
    }
    }
   
}

module.exports.status=async function(req,res){
    const candidate=await User.findOne({email :req.params.email})
    if(candidate){
    res.status(200).json(
         candidate.status
    )}else{
        res.status(404).json({
            message: 'Пользователь с таким email не найден.'
        })
    }
}