const User=require('../models/User')
const Order=require('../models/Order')
const errorHandler=require('../utils/errorHandler')

module.exports.getAll=async function(req,res){
    const query={
        requestS:true
    }
    //date start
    if(req.query.start){
        query.date={
            $gte:req.query.start
        }
    }
    if(req.query.end){
        if(!query.date){
            query.date={}
        }
        query.date['$lte']=req.query.end
    }
    if(req.query.order){
        query.order=+req.query.order
    }
 
    try{
        const orders=await Order
        .find(query)
        .sort({date:-1})
        .skip(+req.query.offset)
        .limit(+req.query.limit)
        res.status(200).json(orders)
    }catch(e){
        errorHandler(res,e)
    }
}


module.exports.getByStatus=async function(req,res){
    try{
        const user=await User.findById(req.user.id)
        if(user.status=='client'){
            const orders=await Order.find(
                {clientId:req.user.id, requestS:req.params.requestS}
                )
                res.status(200).json(orders)  
        }else{
            const orders=await Order.find(
                {requestS:req.params.requestS}
                )
                res.status(200).json(orders)  
        }
              
    }catch(e){
        errorHandler(res,e)
    }
}

module.exports.remove=async function(req,res){
    try{
        await Order.remove({_id: req.params.id})
        res.status(200).json({
            message:'Заявка была удалена'
        })
     }catch(e){
         errorHandler(res,e)
     }
}

module.exports.create=async function(req,res){
    try{
        const lastorder=await Order
        .findOne().sort({date:-1})        
        const maxOrder=lastorder? lastorder.order:0
        const order=await new Order({  
            service: req.body.service,
            // { 
            //     type:  req.body.type,
            //     objectId:req.body.objectId
            // },              
            requestS:req.body.requestS,
            user:req.body.user?req.bode.user:'',
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email ,//? req.bode.email:'',
            description: req.body.description ? req.body.description:'',
            clientId:req.body.clientId,            
            order:maxOrder+1       
        }).save()
        res.status(201).json(order)
    }catch(e){
        errorHandler(res,e)
    }
}

module.exports.update=async function(req,res){
    try{        
        const order=await Order.findOneAndUpdate(
            {_id: req.params.id},
            {$set:req.body},
            {new: true}
            )
        res.status(200).json(order)
     }catch(e){
         errorHandler(res,e)
     }  
}