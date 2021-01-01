const bcrypt=require('bcryptjs')
const Employee=require('../models/Employee')
const User=require('../models/User')
const errorHandler=require('../utils/errorHandler')
const { removeImg } = require('../utils/removeImg')

module.exports.getAll=async function(req,res){
    try{
        const employeis=await Employee.find()
        res.status(200).json(employeis)
    }catch(e){
        errorHandler(res,e)
    }
}

module.exports.getById=async function(req,res){
    try{
        const employee=await Employee.findById(req.params.id)
        res.status(200).json(employee)
    }catch(e){
        errorHandler(res,e)
    }
}

module.exports.getByEmail=async function(req,res){
    try{
        const employee=await Employee.find({email:req.params.email})
        res.status(200).json(employee)
    }catch(e){
        errorHandler(res,e)
    }
}

module.exports.remove=async function(req,res){
    try{
        removeImg(req.params.id, Employee)  
        await Employee.remove({_id:req.params.id})               
        await User.remove({status:req.params.id})        
        res.status(200).json({
            message:'Cотрудник был удален'
        })
    }catch(e){
        errorHandler(res,e)
    }
}

module.exports.create=async function(req,res){       
    const candidate=await Employee.findOne({email:req.body.email})
    if(candidate){      
        res.status(409).json({
            message: 'Такой сотрудник уже добавлен.'
        })
    }else{        
       
        const employee=new Employee({                                   
            email:req.body.email,
            imagePath: req.file ? req.file.path: ''
        })
        try{
          
            await employee.save()            
            res.status(201).json(employee)
        }catch(e){
            errorHandler(res,e)
        }
    }    
}

module.exports.update=async function(req,res){
    const updated={                
        email:req.body.email
    }
    if(req.file){      
    updated.imagePath=req.file.path    
    }
    try{       
        if(req.file){ //Возникает узкий момент, картина удаляется до редактирования документа, и если оно не проходит картинка уже удалена, что ошибка
            removeImg(req.params.id, Employee)  
            }   
        const employee=await Employee.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new:true}
            )                          
            res.status(200).json(employee)
    }catch(e){
        errorHandler(res,e)
    }
}


// module.exports.create=async function(req,res){       
//     const candidate=await User.findOne({fullName: req.body.fullName})
//     const candidateEmail=await User.findOne({email:req.body.email})
//     const candidateEmpl=await Employee.findOne({email:req.body.email})
//     if(candidate || candidateEmpl||candidateEmail){      
//         res.status(409).json({
//             message: 'Такой сотрудник уже добавлен.'
//         })
//     }else{        
//         const salt=bcrypt.genSaltSync(10)
//         const password=req.body.password
//         const user=new User({            
//             fullName:req.body.fullName,        
//             phone:req.body.phone,
//             email:req.body.email,
//             password: bcrypt.hashSync(password, salt), //шифровка
//             status:req.body.positions
//         })
//         const employee=new Employee({            
//             positions:req.body.positions,            
//             email:req.body.email,
//             imagePath: req.file ? req.file.path: ''
//         })
//         try{
//             await user.save()
//             await employee.save()            
//             res.status(201).json(employee)
//         }catch(e){
//             errorHandler(res,e)
//         }
//     }    
// }

// module.exports.update=async function(req,res){
//     const updatedEmpl={        
//         positions:req.body.positions,
//         email:req.body.email
//     }
//     if(req.file){      
//     updated.imagePath=req.file.path    
//     }
//     try{       
//         if(req.file){ //Возникает узкий момент, картина удаляется до редактирования документа, и если оно не проходит картинка уже удалена, что ошибка
//             removeImg(req.params.id, Employee)  
//             }   
//         const employee=await Employee.findOneAndUpdate(
//             {_id: req.params.id},
//             {$set: updatedEmpl},
//             {new:true}
//             )                          
//             res.status(200).json(employee)
//     }catch(e){
//         errorHandler(res,e)
//     }}